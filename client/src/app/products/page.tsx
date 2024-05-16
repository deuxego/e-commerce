'use client';

import { useSearchParams } from 'next/navigation';
import { ProductList } from '@/features/product';

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? undefined;

  return (
    <div>
      <ProductList query={query} />
    </div>
  );
};

export default Page;
