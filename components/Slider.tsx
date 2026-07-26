"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const data = [
    {
        title: "Bản đồ rộng lớn",
        image: "/assets/Card/card1.png",
    },
    {
        title: "Chiến đấu đỉnh cao",
        image: "/assets/Card/card1.png",
    },
    {
        title: "Boss khủng",
        image: "/assets/Card/card1.png",
    },
    {
        title: "Thời trang đa dạng",
        image: "/assets/Card/card1.png",
    },
    {
        title: "Thời trang đa dạng",
        image: "/assets/Card/card1.png",
    },
    {
        title: "Thời trang đa dạng",
        image: "/assets/Card/card1.png",
    },


];

export default function Slider() {
    return (
        <div className="relative py-5">

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                pagination={{
                    clickable: false,
                }}
                autoplay={{
                    delay: 3000,
                }}
                    spaceBetween={15}
                    slidesPerView={4}
                    loop
                    breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >

                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-600
                                bg-[#172033]
                                shadow-lg
                            "
                        >

                            <div className="relative h-[170px]">
                                <Image
                                    src={item.image}
                                    fill
                                    alt={item.title}
                                    className="object-cover"
                                />
                            </div>


                            <div
                                className="
                                py-3
                                text-center
                                text-sm
                                text-white
                                "
                            >
                                {item.title}
                            </div>

                        </div>
                    </SwiperSlide>
                ))}


            </Swiper>

        </div>
    );
}
