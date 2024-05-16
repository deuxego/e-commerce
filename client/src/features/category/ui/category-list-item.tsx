import { GetCategoryDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { buildUrl } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  category: GetCategoryDto;
};

export const CategoryListItem = ({ category }: Props) => {
  return (
    <div className="relative bg-gray-100 block p-6 border border-gray-100 rounded-lg">
      <div className="my-4 w-[250px]">
        <h2 className="text-black text-2xl font-bold pb-2">{category.name}</h2>
      </div>

      <div className="flex justify-end">
        <Link
          href={buildUrl('PRODUCT', { query: category.name })}
          className="px-2 py-1 text-black border border-gray-600 font-semibold rounded hover:bg-gray-200"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};
