"use client"
import BoxCard from "../cart";
import SliderBase from "../SliderBase";

const NoiBat2 = () => {
    const data = [
        {
            id: 1,
            img: "/assets/Card/card1.webp",
            title: "Cày Cuốc Tự Do",
            subtitle: "Tự do khám phá, săn boss, nâng cấp...",
        },
        {
            id: 2,
            img: "/assets/Card/card1.webp",
            title: "PK Không Giới Hạn",
            subtitle: "Chiến đấu mọi lúc, mọi nơi...",
        },
        {
            id: 3,
            img: "/assets/Card/card1.webp",
            title: "Bang Hội",
            subtitle: "Lập bang hội, chinh phục boss...",
        },
        {
            id: 4,
            img: "/assets/Card/card1.webp",
            title: "Trang Bị",
            subtitle: "Thu thập và nâng cấp trang bị...",
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-6">
            {
                data && data.map(item => (
                    <SliderBase
                        key={item.id}
                        items={data}
                        slidesPerView={2}
                        renderItem={(item)=>(
                            <BoxCard
                                key={item.id}
                                img={item.img}
                                title={item.title}
                                subTitle={item.subtitle}
                            />
                        )}
                    />
                ))
            }
        </div>
    )
}
export default NoiBat2