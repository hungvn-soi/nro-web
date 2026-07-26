"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface SliderProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;

    slidesPerView?: number;
    spaceBetween?: number;
    breakpoints?: {
        [key: number]: {
            slidesPerView: number;
        };
    };
}

export default function SliderBase<T>({
    items,
    renderItem,
    slidesPerView = 4,
    spaceBetween = 15,
    breakpoints,
}: SliderProps<T>) {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            breakpoints={
                breakpoints ?? {
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView },
                }
            }
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>
                    {renderItem(item, index)}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}