'use client';

import { useProductList } from '../model/use-product-list';
import { ProductListItem } from './product-list-item';

type Props = {
  query?: string;
};

export const ProductList = ({ query }: Props) => {
  const { data } = useProductList(query);

  return (
    <div className="flex gap-5 flex-wrap">
      {data?.map((product) => (
        <ProductListItem {...product} key={product.id} />
      ))}
    </div>
  );
};
