import { categoryControllerFindAll } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';

const categoryKey = ['category'];

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: categoryKey,
    queryFn: categoryControllerFindAll
  });
};
