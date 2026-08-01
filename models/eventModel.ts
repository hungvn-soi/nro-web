import { db } from "@/db";
import { event } from "@/db/schema";
import { IEvent } from "@/types/event";
import { and, asc, eq, gte } from "drizzle-orm";

export async function getAllEvents(): Promise<IEvent[]> {
    const data = await db
        .select()
        .from(event)
        .where(eq(event.state, 1))
        .orderBy(asc(event.startDate))
        .limit(5);

    return data.map((item) => (mapEvent(item)));
}

export async function getHotEvent(): Promise<IEvent | null> {
    const now = new Date();

    const [item] = await db
        .select()
        .from(event)
        .where(
            and(
                eq(event.state, 1),
                gte(event.endDate, now)
            )
        )
        .orderBy(asc(event.endDate))
        .limit(1);

    return item ? mapEvent(item) : null;
}





function mapEvent(item: typeof event.$inferSelect): IEvent {
    return {
        id: item.id,
        name: item.name,
        active: item.state === 1,
        image: item.image,
        badge: item.badge,
        description: item.description,
        startDate: item.startDate
            ? item.startDate.toLocaleDateString("vi-VN")
            : null,
        endDate: item.endDate
            ? item.endDate.toLocaleDateString("vi-VN")
            : null,
    };
}