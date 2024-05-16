import { CartBadge, CartSheet } from '@/features/cart';
import { SearchBar } from '@/features/product';
import { Logo } from '@/shared/ui/logo';

export const Header = () => {
  return (
    <header className="container py-5 flex items-center justify-between">
      <Logo />

      <SearchBar />

      <div>
        <CartSheet trigger={<CartBadge />} />
      </div>
    </header>
  );
};
