'use client';

import { useCartQuery } from '@/entities/cart';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Separator } from '@/shared/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';
import { ReactNode } from 'react';
import { CartSheetItem } from './cart-sheet-item';
import { useCartTotal } from '../model/use-cart-total';

type Props = {
  trigger: ReactNode;
};

export const CartSheet = ({ trigger }: Props) => {
  const { data } = useCartQuery();
  const { total } = useCartTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} className="border-none pb-5">
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />

        <div className='space-y-5'>
          {data?.cartItems.map((cartItem) => (
            <CartSheetItem {...cartItem} key={cartItem.id} />
          ))}
        </div>

        <div className="w-full flex justify-between mt-10">
          <div className="text-muted-foreground">Total</div>
          <div className="text-md font-semibold">{total} ₴</div>
        </div>
        <Separator />

        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
