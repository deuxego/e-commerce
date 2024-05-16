import {
  productControllerGetProduct,
  productControllerGetProducts
} from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';

const productKey = ['product'] as unknown[];

export const useProductsQuery = (query?: string) => {
  return useQuery({
    queryKey: productKey.concat([{ query }]),
    queryFn: () => productControllerGetProducts({ query })
  });
};

export const useProductQuery = (productId: string) => {
  return useQuery({
    queryKey: productKey.concat([{ productId }]),
    queryFn: () => productControllerGetProduct(productId)
  });
};
