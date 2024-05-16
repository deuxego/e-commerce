'use client';

import { useCategoryQuery } from '@/entities/category';
import { cn } from '@/shared/lib/utils';
import { CategoryListItem } from './category-list-item';

export const CategoryList = ({ className }: { className?: string }) => {
  const { data } = useCategoryQuery();

  return (
    <div className={cn('flex flex-col space-y-16', className)}>
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
        Categories
      </h1>

      <div className='flex gap-5'>
        {data?.map((category) => (
          <CategoryListItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};
