import { useCartQuery } from '@/entities/cart';

export const useCartBadge = () => {
  const { data } = useCartQuery();

  return {
    quantity: data?.cartItems.reduce((acc, p) => acc + p.quantity, 0) ?? 0
  };
};
