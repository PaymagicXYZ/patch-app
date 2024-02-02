'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { cn, getSupportedLookupNetworks } from '@/utils';
import { Button } from './ui/button';
import { useDebouncedCallback } from 'use-debounce';
import { useContext, useRef } from 'react';
import { UserContext } from '@/context/user-provider';
import { SupportedSocialNetworkIds } from '@/types';
import { useModifyQueryParams } from '@/hooks/useModifyQueryParams';
import { useFormState, useFormStatus } from 'react-dom';
import { fetchUserAddress } from '@/libs/actions/utils';
import { UserId } from '@patchwallet/patch-sdk';
import { LoadingSpinner } from './Spinner';
import { LookupInput } from './ui/lookup-input';
import { Input } from './ui/input';

/**
 * Form to lookup a user's wallet based on query params and client-side routing e.g. in "/home" page
 */
export const UserLookupClientForm = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { chain } = useContext(UserContext);
  // Note: If the user hasn't selected a provider, it should default to 'twitter'
  const lookupProviderId = (searchParams.get('provider')?.toString() as SupportedSocialNetworkIds) ?? 'twitter';
  const lookupProviderDetails = getSupportedLookupNetworks()[lookupProviderId];
  const { modifyQueryParams } = useModifyQueryParams();

  const withDebounce = useDebouncedCallback(modifyQueryParams, 300);

  const handleOnSubmit = () => {
    const params = new URLSearchParams(searchParams);

    if (!params.get('provider')) {
      params.set('provider', 'twitter');
    }

    const _provider = params.get('provider');
    const _user = params.get('query');

    push(`/${_provider}:${_user}/${chain}`);
  };

  const queryString = searchParams.get('query')?.toString();

  return (
    <div className="flex w-full gap-2 sm:w-4/6 sm:max-w-[520px]">
      <LookupInput
        onInputChange={(e) => withDebounce('query', e.target.value)}
        onSelectChange={(value) => modifyQueryParams('provider', value)}
        defaultValue={queryString}
        placeholder={lookupProviderDetails.placeholder}
      />
      <Button onClick={handleOnSubmit} disabled={!queryString} className="rounded-lg bg-orange-100 text-gray-1000">
        Look up wallet
      </Button>
    </div>
  );
};

/**
 * Form to lookup a user's wallet based on serverside form submission e.g. in "Send" modal
 */
export const UserLookupServerForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fireSubmitWithDebounce = useDebouncedCallback(() => {
    formRef.current?.requestSubmit();
  }, 300);

  const [state, formAction] = useFormState(fetchUserAddress, initialServerFormState);
  console.log('state', state);

  return (
    <div className="flex w-full">
      <form action={formAction} ref={formRef} className="relative flex flex-1 items-center">
        <LookupInput onInputChange={fireSubmitWithDebounce} onSelectChange={fireSubmitWithDebounce} />
        <LoadingIndicator className="absolute right-4 text-gray-300" />
        <p className="absolute -bottom-6 left-2 text-sm text-red-600">{state.errorMessage}</p>
      </form>
    </div>
  );
};

function LoadingIndicator({ className }: { className?: string }) {
  // Note: useFormStatus works only in the context of a form
  const { pending } = useFormStatus();
  return (
    <LoadingSpinner
      className={cn(className, {
        hidden: !pending,
      })}
    />
  );
}

const initialServerFormState = {
  address: '' as UserId,
  provider: 'twitter' as SupportedSocialNetworkIds,
  errorMessage: '',
};

export const UserLookupCustom = ({ by }: { by: 'address' | 'domain' }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fireSubmitWithDebounce = useDebouncedCallback(() => {
    formRef.current?.requestSubmit();
  }, 500);

  const [state, formAction] = useFormState(fetchUserAddress, initialServerFormState);

  const content = {
    address: {
      btnTitle: 'Address',
      placeholder: 'Enter address',
      onInputChange: fireSubmitWithDebounce,
    },
    domain: {
      btnTitle: 'Domain',
      placeholder: 'Enter domain',
      onInputChange: fireSubmitWithDebounce,
    },
  };
  return (
    <div className="flex w-full">
      <form action={formAction} ref={formRef} className="relative flex flex-1 items-center">
        <Input
          className="pl-24"
          placeholder={content[by].placeholder}
          onChange={content[by].onInputChange}
          name="userId"
          leftButton={
            <div className="flex items-center rounded-lg border-[0.5px] border-gray-800 bg-gray-900 p-2.5 py-1 text-gray-600">
              <div>{content[by].btnTitle}</div>
              <input type="hidden" name="provider" value={by} />
            </div>
          }
        />
        <LoadingIndicator className="absolute right-4 text-gray-300" />
        <p className="absolute -bottom-6 left-2 text-sm text-red-600">{state.errorMessage}</p>
      </form>
    </div>
  );
};
