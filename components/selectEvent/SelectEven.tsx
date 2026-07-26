import { memo } from "react";
import SectionTitle2 from "../SectionTitle2";
import NewsCard from "./CardEvent";

const EVENTS = [
    {
        id: 1,
        href: "/su-kien/1",
        image: "/assets/Card/card1.png",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 2,
        href: "/su-kien/2",
        image: "/assets/Card/card1.png",
        title: "X2 EXP CUỐI TUẦN",
        badge: "NEW",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 3,
        href: "/su-kien/3",
        image: "/assets/Card/card1.png",
        title: "X2 EXP CUỐI TUẦN",
        badge: "NEW",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 4,
        href: "/su-kien/4",
        image: "/assets/Card/card1.png",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
    {
        id: 5,
        href: "/su-kien/5",
        image: "/assets/Card/card1.png",
        title: "X2 EXP CUỐI TUẦN",
        badge: "HOT",
        description: "Tăng x2 kinh nghiệm trong 2 ngày cuối tuần. Đừng bỏ lỡ!",
        time: "Thứ 6 - Chủ Nhật",
    },
] as const;

function SelectEvent() {
    return (
        <section>
            <SectionTitle2 title="Sự kiện nổi bật" />

            <div className="mt-5 flex flex-col gap-4">
                {EVENTS.map((event) => (
                    <NewsCard
                        key={event.id}
                        href={event.href}
                        image={event.image}
                        title={event.title}
                        badge={event.badge}
                        description={event.description}
                        time={event.time}
                    />
                ))}
            </div>
        </section>
    );
}

export default memo(SelectEvent);