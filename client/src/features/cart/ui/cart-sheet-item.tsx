import { GetCartDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useAddCartItemButton } from '../model/use-add-to-cart-button';
import { useRemoveCartItemButton } from '../model/use-remove-to-cart-button';

export const CartSheetItem = ({
  product,
  quantity,
  productId
}: GetCartDto['cartItems'][0]) => {
  const { handleAddCartItem } = useAddCartItemButton();
  const { handleRemoveCartItem } = useRemoveCartItemButton();

  return (
    <div className="flex items-center justify-between">
      <div className='flex-y-center'>
        <div className="relative w-16 h-16">
          <Image
            src={'/api/uploads' + product.imageUrl}
            alt="Product image"
            fill={true}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div>
          <p className="text-lg font-semibold">{product.name}</p>
          <span className="text-muted-foreground">{product.price} ₴</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => handleRemoveCartItem(productId)}
          disabled={quantity <= 0}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-lg font-bold tracking-tighter">{quantity}</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => handleAddCartItem(productId)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
};
