"use client";

import { ReactNode, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;

    desktop?: number;
    tablet?: number;
    mobile?: number;

    gap?: number;

    autoplay?: boolean;
    loop?: boolean;

    showArrow?: boolean;
}

export default function SliderBase<T>({
    items,
    renderItem,

    desktop = 4,
    tablet = 2,
    mobile = 1,

    gap = 15,

    autoplay = true,
    loop = true,

    showArrow = true,
}: SliderProps<T>) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop,
            align: "start",
            dragFree: false,
        },
        autoplay
            ? [
                Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
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
        <div className="relative w-full">

            {showArrow && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            <div className="overflow-hidden" ref={emblaRef}>
                <div
                    className="flex"
                    style={{
                        gap: `${gap}px`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`
                min-w-0
                flex-[0_0_calc(100%/${mobile})]
                sm:flex-[0_0_calc(100%/${tablet})]
                lg:flex-[0_0_calc(100%/${desktop})]
              `}
                        >
                            {renderItem(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}