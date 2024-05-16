import { CategoryList } from '@/features/category';
import { ProductSlider } from '@/features/product';

export default function Home() {
  return (
    <div>
      <ProductSlider />
      <CategoryList className="mt-16" />
    </div>
  );
}
