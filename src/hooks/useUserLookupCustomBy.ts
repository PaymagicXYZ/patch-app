import { fetchUserAddress } from '@/libs/actions/utils';
import { SupportedSocialNetworkIds } from '@/types';
import { UserId } from '@patchwallet/patch-sdk';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useDebouncedCallback } from 'use-debounce';

const initialServerFormState = {
  address: '' as UserId,
  provider: 'twitter' as SupportedSocialNetworkIds,
  errorMessage: '',
};

export const useUserLookupBy = ({ by = 'default' }: { by?: 'address' | 'domain' | 'default' } = {}) => {
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
    default: {
      btnTitle: '',
      placeholder: 'username',
      onInputChange: fireSubmitWithDebounce,
    },
  };

  return {
    formRef,
    formAction,
    content: content[by],
    state,
  }
};
