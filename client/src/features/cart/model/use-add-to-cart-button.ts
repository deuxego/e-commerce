import { useAddCartItemMutate } from '@/entities/cart';

export const useAddCartItemButton = () => {
  const { mutateAsync, isPending } = useAddCartItemMutate();

  return {
    async handleAddCartItem(productId: string, quantity = 1) {
      await mutateAsync({ productId, quantity });
    },
    isLoading: isPending
  };
};
