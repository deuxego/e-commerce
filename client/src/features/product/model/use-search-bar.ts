import { buildUrl } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useSearchBar = () => {
  const { register, handleSubmit, reset } = useForm();
  const { push } = useRouter();

  return {
    register,
    handleSubmit: handleSubmit(({ query }) => {
      push(buildUrl('PRODUCT', { query }));
      reset();
    })
  };
};
