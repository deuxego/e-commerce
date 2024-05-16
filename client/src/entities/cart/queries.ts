import {
  cartControllerAddProductToCart,
  cartControllerGetCart,
  cartControllerRemoveProductFromCart
} from '@/shared/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const cartKey = ['cart'];

export const useCartQuery = () => {
  return useQuery({
    queryKey: cartKey,
    queryFn: cartControllerGetCart
  });
};

export const useAddCartItemMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartControllerAddProductToCart,
    async onSettled() {
      queryClient.invalidateQueries({ queryKey: cartKey });
    }
  });
};

export const useRemoveCartItemMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartControllerRemoveProductFromCart,
    async onSettled() {
      queryClient.invalidateQueries({ queryKey: cartKey });
    }
  });
};
