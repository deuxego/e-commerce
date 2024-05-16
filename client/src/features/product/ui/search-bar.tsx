'use client';

import { Input } from '@/shared/ui/input';
import { useSearchBar } from '../model/use-search-bar';
import { Button } from '@/shared/ui/button';

export const SearchBar = () => {
  const { register, handleSubmit } = useSearchBar();

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        {...register('query')}
        className="w-[800px] rounded-3xl bg-gray-200 p-6"
        placeholder="Search for products..."
      />
      <Button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2.5">
        <SearchIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="#fdf9f9"
      d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
    />
  </svg>
);
