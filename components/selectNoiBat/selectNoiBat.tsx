"use client";

import BoxCard from "../cart";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const data = [
    {
        id: 1,
        img: "/assets/tinhnang/tinhnang1.webp",
        title: "Cày Cuốc Tự Do",
        subtitle: "Tự do khám phá, săn boss, nâng cấp không giới hạn",
    },
    {
        id: 2,
        img: "/assets/tinhnang/tinhnang2.webp",
        title: "Hệ thống",
        subtitle: "Nhiều tính năng hấp dẫn, Pet, Vũ khí, Lính thú,...",
    },
    {
        id: 3,
        img: "/assets/tinhnang/tinhnang3.webp",
        title: "Boss siêu khủng",
        subtitle: "Hàng trăm boss từ thấp đến cao tha hồ PK",
    },
    {
        id: 4,
        img: "/assets/tinhnang/tinhnang4.webp",
        title: "Cộng đồng",
        subtitle: "Kết bạn, lập bang hội cùng nhau tranh tài",
    },
    {
        id: 5,
        img: "/assets/tinhnang/tinhnang5.webp",
        title: "Sự kiện hấp dẫn",
        subtitle: "Sự kiện theo tuần, tháng hấp dẫn",
    },
];

export default function NoiBat() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
        },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
            }),
        ]
    );

    const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className="relative py-5">
            {/* Prev */}
            <button
                onClick={prev}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
                onClick={next}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
                <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="
                            min-w-0
                            flex-[0_0_50%]
                            px-2
                            sm:flex-[0_0_33.333%]
                            lg:flex-[0_0_20%]
                        "
                        >
                            <BoxCard
                                img={item.img}
                                title={item.title}
                                subTitle={item.subtitle}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}