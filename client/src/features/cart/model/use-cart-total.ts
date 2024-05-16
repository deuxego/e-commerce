import { useCartQuery } from '@/entities/cart';

export const useCartTotal = () => {
  const { data } = useCartQuery();

  const total = data?.cartItems.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.product.price),
    0
  );

  return { total: total?.toFixed(2) };
};
