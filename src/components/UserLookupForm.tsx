'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { SelectSocialProvider } from './SelectSocialProvider';
import { Input, InputProps } from './ui/input';
import { cn, getSupportedLookupNetworks } from '@/utils';
import { Button } from './ui/button';
import { useDebouncedCallback } from 'use-debounce';
import { FormEvent, FormEventHandler, memo, useCallback, useContext, useEffect, useRef } from 'react';
import { UserContext } from '@/context/user-provider';
import { SupportedSocialNetworkIds } from '@/types';
import { useModifyQueryParams } from '@/hooks/useModifyQueryParams';
import { useFormState, useFormStatus } from 'react-dom';
import { fetchUserAddress } from '@/libs/actions/resolveSocialProfile';
import { UserId } from '@patchwallet/patch-sdk';

// ... (imports)

const initialState = {
  address: '' as UserId,
  provider: 'twitter',
};

interface UserLookupFormProps extends InputProps {
  type: 'server' | 'client';
  withSubmitButton?: boolean;
}

function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending, data } = useFormStatus();
  console.log("pending button", {data: data?.get('provider'), pending})
  return (
    <Button type="submit" aria-disabled={!isDisabled || pending} className="rounded-lg bg-orange-100 text-gray-1000">
      Look up wallet
    </Button>
  );
}

function UserForm({ type, formRef, handleOnSubmit, queryString, config, className, ...props }: any) {
  const { pending } = useFormStatus();
  console.log("pending userform", pending)
  return (
    <form action={config[type]?.onSubmit} ref={formRef}>
      <Input
        defaultValue={queryString}
        name="userId"
        onChange={(e) => (type === 'client' ? config[type]?.onChange('query', e.target.value) : config[type]?.onChange?.())}
        leftButton={<SelectSocialProvider name="provider" onChange={() => config[type]?.onSelectChange?.()} />}
        type="text"
        className={cn('mt-4 w-[360px] border-gray-800 bg-gray-950 focus:border-[0.5px] focus:bg-gray-1000', className)}
        {...props}
      />
      {props.withSubmitButton ? <SubmitButton isDisabled={!queryString} /> : <></>}
      {pending && <div>Loading...</div>}
      <p>{props.state.address}</p>
    </form>
  );
}

export const UserLookupForm = ({ className, onChange, type = 'client', withSubmitButton = true, ...props }: UserLookupFormProps) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { chain } = useContext(UserContext);
  const formRef = useRef<HTMLFormElement>(null);
  const lookupProviderId = (searchParams.get('provider')?.toString() as SupportedSocialNetworkIds) ?? 'twitter';
  const { modifyQueryParams } = useModifyQueryParams();
  const withDebounce = useDebouncedCallback(modifyQueryParams, 300);
  const fireSubmitWithDebounce = useDebouncedCallback(() => formRef.current?.requestSubmit(), 300);
  const queryString = searchParams.get('query')?.toString();
  const [state, formAction] = useFormState(fetchUserAddress, initialState);

  const handleOnSubmit = () => {
    const params = new URLSearchParams(searchParams);
    if (!params.get('provider')) {
      params.set('provider', 'twitter');
    }
    const _provider = params.get('provider');
    const _user = params.get('query');
    push(`/${_provider}:${_user}/${chain}`);
  };

  const config = {
    client: { onSubmit: handleOnSubmit, onChange: withDebounce, onSelectChange: modifyQueryParams },
    server: { onSubmit: formAction, onChange: fireSubmitWithDebounce, onSelectChange: fireSubmitWithDebounce },
  };

  return (
    <div className="flex w-full sm:w-4/6 sm:max-w-[520px]">
      <UserForm
        type={type}
        formRef={formRef}
        handleOnSubmit={handleOnSubmit}
        queryString={queryString}
        config={config}
        className={className}
        withSubmitButton={withSubmitButton}
        state={state}
        lookupProviderId={lookupProviderId}
        {...props}
      />
    </div>
  );
};
