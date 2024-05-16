'use client';

import { useProductQuery } from '@/entities/product';
import { AddCartItemButton } from '@/features/cart';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  productId: string;
  action?: ReactNode;
};

export const Product = ({ productId, action }: Props) => {
  const { data } = useProductQuery(productId);

  return (
    <div className="w-full h-[500px] flex">
      <div className="relative w-1/2">
        <Image
          src={`/api/uploads${data?.imageUrl}`}
          alt="Product image"
          fill={true}
          quality={100}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="flex flex-col justify-between w-1/2 h-full p-5">
        <div>
          <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-slate-600 to-stone-800">
            {data?.name}
          </h3>

          <p className="mt-5 text-[15px] font-semibold text-gray-400 w-2/3">
            {data?.description}
          </p>
        </div>

        <div className="flex flex-col gap-5 w-fit">
          <p className="font-bold text-2xl">Price: {data?.price} ₴</p>
          {action}
        </div>
      </div>
    </div>
  );
};
