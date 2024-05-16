import { useRemoveCartItemMutate } from '@/entities/cart';

export const useRemoveCartItemButton = () => {
  const { mutateAsync, isPending } = useRemoveCartItemMutate();

  return {
    async handleRemoveCartItem(productId: string, quantity = 1) {
      await mutateAsync({ productId, quantity });
    },
    isLoading: isPending
  };
};
