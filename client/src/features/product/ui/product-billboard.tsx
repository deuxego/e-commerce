import { GetProductDto } from '@/shared/api/generated';
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

type Props = {
  product: GetProductDto;
};

export const ProductSlide = ({ product }: Props) => {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 flex-center flex-col gap-5">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-slate-400 to-stone-500">
          {product.name}
        </h2>
        <p className="text-lg font-normal text-gray-500 lg:text-md dark:text-gray-400 max-w-[400px]">
          <TruncateMarkup ellipsis="..." lines={2}>
            <div>{product.description}</div>
          </TruncateMarkup>
        </p>

        <Link href={ROUTES.PRODUCT + product.id}>
          <Button className="py-6 px-12 bg-black text-lg">Shop Now</Button>
        </Link>
      </div>

      <div className="relative w-1/2 h-full">
        <Image
          src={`/api/uploads${product.imageUrl}`}
          alt="Product Slide Image"
          fill={true}
          priority={true}
          quality={85}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};
