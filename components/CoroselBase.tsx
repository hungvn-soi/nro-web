"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => ReactNode;

    mobile?: number;
    tablet?: number;
    desktop?: number;

    autoplay?: boolean;
    delay?: number;
    loop?: boolean;
}

export default function Carousel<T>({
    data,
    renderItem,
    mobile = 1,
    tablet = 2,
    desktop = 4,
    autoplay = true,
    delay = 3000,
    loop = true,
}: CarouselProps<T>) {
    const [basis, setBasis] = useState(`${100 / desktop}%`);

    useEffect(() => {
        const updateBasis = () => {
            if (window.innerWidth >= 1024) {
                setBasis(`${100 / desktop}%`);
            } else if (window.innerWidth >= 640) {
                setBasis(`${100 / tablet}%`);
            } else {
                setBasis(`${100 / mobile}%`);
            }
        };

        updateBasis();

        window.addEventListener("resize", updateBasis);

        return () => {
            window.removeEventListener("resize", updateBasis);
        };
    }, [mobile, tablet, desktop]);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop,
            align: "start",
        },
        autoplay
            ? [
                Autoplay({
                    delay,
                    stopOnInteraction: false,
                }),
            ]
            : []
    );

    const prev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const next = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative">
            <button
                onClick={prev}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={next}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white"
            >
                <ChevronRight />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="shrink-0 px-2"
                            style={{
                                flex: `0 0 ${basis}`,
                            }}
                        >
                            {renderItem(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}