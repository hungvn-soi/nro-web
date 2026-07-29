import { db } from "@/db";
import { event } from "@/db/schema";
import { IEvent } from "@/types/event";
import { asc } from "drizzle-orm";

export async function getAllEvents(): Promise<IEvent[]> {
    const data = await db
        .select()
        .from(event)
        .orderBy(asc(event.startDate))
        .limit(5);

    return data.map((item) => ({
        id: item.id,
        name: item.name,
        state: item.state === 1,
        image: item.image,
        badge: item.badge,
        description:item.description,
        startDate: item.startDate
            ? item.startDate.toLocaleDateString("vi-VN")
            : null,
        endDate: item.endDate
            ? item.endDate.toLocaleDateString("vi-VN")
            : null,
    }));
}