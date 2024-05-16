import { useAddCartItemButton } from '@/features/cart/model/use-add-to-cart-button';
import { GetProductDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TruncateMarkup from 'react-truncate-markup';

export const ProductListItem = ({
  imageUrl,
  name,
  description,
  price,
  id
}: GetProductDto) => {
  const { handleAddCartItem } = useAddCartItemButton();

  return (
    <article className="max-w-sm w-full bg-white rounded-lg bg-gray-50 shadow-lg overflow-hidden dark:bg-gray-700">
      <Link href={ROUTES.PRODUCT + id}>
        <div className="relative w-92 h-64">
          <Image
            src={`/api/uploads${imageUrl}`}
            alt="Product image"
            fill={true}
            quality={70}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="flex flex-col gap-1 mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
            {name}
          </h2>
          <TruncateMarkup ellipsis="..." lines={2}>
            <span className="font-normal text-gray-600 dark:text-gray-300">
              {description}
            </span>
          </TruncateMarkup>
          <span className="font-semibold text-gray-800 dark:text-gray-50">
            {price} ₴
          </span>
        </div>
      </Link>

      <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
        <button
          onClick={() => handleAddCartItem(id)}
          className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
        >
          <span className="text-base">Add to Cart</span>
          <Plus />
        </button>
      </div>
    </article>
  );
};
