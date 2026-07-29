"use client"
import { memo } from "react";
import SectionTitle2 from "../SectionTitle2";
import NewsCard from "./CardEvent";
import { IEvent } from "@/types/event";

const EVENTS = [
    {
        id: 1,
        href: "/su-kien/1",
        image: "/assets/Card/card1.webp",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 2,
        href: "/su-kien/2",
        image: "/assets/Card/card1.webp",
        title: "X2 EXP CUỐI TUẦN",
        badge: "NEW",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 3,
        href: "/su-kien/3",
        image: "/assets/Card/card1.webp",
        title: "X2 EXP CUỐI TUẦN",
        badge: "NEW",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 4,
        href: "/su-kien/4",
        image: "/assets/Card/card1.webp",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 5,
        href: "/su-kien/5",
        image: "/assets/Card/card1.webp",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
] as const;


interface IProps{
    dataEvents: IEvent[]
}

const SelectEvent = ({ dataEvents }: IProps) => {
    return (
        <section>
            <SectionTitle2 title="Sự kiện nổi bật" />

            <div className="mt-5 flex flex-col gap-4">
                {dataEvents.map((event) => (
                    <NewsCard
                        key={event.id}
                        image={event.image || ""}
                        title={event.name}
                        badge={event.badge}
                        description={event.description || ""}
                        startDate={event.startDate}
                        endDate={event.endDate}
                    />
                ))}
            </div>
        </section>
    );
}

export default memo(SelectEvent);