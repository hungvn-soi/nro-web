"use client"
import { memo } from "react";
import SectionTitle2 from "../SectionTitle2";
import NewsCard from "./CardEvent";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";

interface IProps{
    dataEvents: IEvent[]
}

const SelectEvent = ({ dataEvents }: IProps) => {
    const router = useRouter();

    const handleViewAll = () => {
        router.push("/event");
    }
    return (
        <section>
            <SectionTitle2 title="Sự kiện nổi bật" onViewAll={handleViewAll} />

            <div className="mt-5 flex flex-col gap-4">
                {dataEvents.map((event) => (
                    <NewsCard
                        key={event.id}
                        href={`/event/${event.id}`}
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