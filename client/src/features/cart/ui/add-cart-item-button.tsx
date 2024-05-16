'use client';

import { Button } from '@/shared/ui/button';
import { useAddCartItemButton } from '../model/use-add-to-cart-button';

type Props = {
  productId: string;
};

export const AddCartItemButton = ({ productId }: Props) => {
  const { handleAddCartItem, isLoading } = useAddCartItemButton();

  return (
    <Button
      className="bg-black text-md font-bold"
      disabled={isLoading}
      onClick={() => handleAddCartItem(productId)}
    >
      Add To Cart
    </Button>
  );
};
