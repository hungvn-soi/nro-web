import { db } from "@/db";
import { serverStatus } from "@/db/schema";
import { IServerStatus } from "@/types/serverStatus";

export async function getServerStatus(): Promise<IServerStatus | null> {
    const data = await db.select().from(serverStatus).limit(1);

    if (!data.length) return null;

    return {
        id: data[0].id,
        online: data[0].online === 1,
        playersOnline: data[0].playersOnline,
        updatedAt: data[0].updatedAt,
    };
}