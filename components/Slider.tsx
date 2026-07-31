"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const data = [
    {
        title: "Bản đồ rộng lớn",
        image: "/assets/imgInGame/ingame1.webp",
    },
    {
        title: "Chiến đấu đỉnh cao",
        image: "/assets/imgInGame/inGame2.webp",
    },
    {
        title: "Boss khủng",
        image: "/assets/imgInGame/inGame3.webp",
    },
    {
        title: "Thời trang đa dạng",
        image: "/assets/imgInGame/ThoiTrang.webp",
    },
    {
        title: "Pet Thời thượng",
        image: "/assets/imgInGame/Pet.webp",
    },
];

export default function Slider() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            skipSnaps: false,
        },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
            }),
        ]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative py-5">

            {/* Prev */}
            <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
                <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="
                min-w-0
                flex-[0_0_100%]
                px-2
                sm:flex-[0_0_50%]
                lg:flex-[0_0_25%]
              "
                        >
                            <div className="overflow-hidden rounded-xl border border-gray-600 bg-[#172033] shadow-lg">

                                <div className="relative aspect-[16/10] w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width:640px) 100vw,
                           (max-width:1024px) 50vw,
                           25vw"
                                    />
                                </div>

                                <div className="py-3 text-center text-sm text-white">
                                    {item.title}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}