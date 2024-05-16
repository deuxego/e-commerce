'use client';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper as SwiperUi, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ReactNode } from 'react';
import { cn } from '../lib/utils';

type Props = {
  data: ReactNode[] | undefined;
  className?: string;
};

export const Swiper = ({ data, className }: Props) => {
  return (
    <SwiperUi
      className={cn('w-full h-[500px] bg-gray-100 rounded-xl', className)}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
    >
      {data?.map((node, i) => (
        <SwiperSlide key={i}>{node}</SwiperSlide>
      ))}
    </SwiperUi>
  );
};
