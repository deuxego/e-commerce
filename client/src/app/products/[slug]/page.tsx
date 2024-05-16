import { AddCartItemButton } from '@/features/cart';
import { Product } from '@/features/product';

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="py-12 bg-gray-50 rounded-2xl">
      <Product
        productId={params.slug}
        action={<AddCartItemButton productId={params.slug} />}
      />
    </div>
  );
};

export default Page;
