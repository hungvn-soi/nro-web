import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { player } from "@/db/schema";
import { IPlayer } from "@/types/player";
import { getCurrLevel, getCurrStrLevel } from "@/utils/playerLevel";


export async function getTopPower(
    limit: number = 10
): Promise<IPlayer[]> {
    const data = await db
        .select({
            id: player.id,
            accountId: player.accountId,
            name: player.name,
            head: player.head,
            gender: player.gender,
            power: sql<number>`
        CAST(JSON_EXTRACT(${player.dataPoint}, '$[1]') AS UNSIGNED)
      `.as("power"),
        })
        .from(player)
        .orderBy(
            desc(
                sql`CAST(JSON_EXTRACT(${player.dataPoint}, '$[1]') AS UNSIGNED)`
            )
        )
        .limit(limit);

    return data.map((item) => ({
        id: item.id,
        accountId: item.accountId ?? 0,
        name: item.name,
        head: item.head,
        gender: item.gender,
        power: item.power,

        level: getCurrLevel(item.power),
        levelName: getCurrStrLevel(item.power, item.gender),
    }));
}