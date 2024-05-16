import { useProductsQuery } from '@/entities/product';

export const useProductList = (query?: string) => {
  return useProductsQuery(query);
};
