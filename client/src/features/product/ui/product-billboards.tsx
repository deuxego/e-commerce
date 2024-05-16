'use client';

import { useProductsQuery } from '@/entities/product';
import { Swiper } from '@/shared/ui/swiper';
import { ProductSlide } from './product-billboard';

export const ProductSlider = () => {
  const { data } = useProductsQuery();

  return (
    <Swiper
      data={data?.map((product) => (
        <ProductSlide product={product} key={product.id} />
      ))}
    />
  );
};
