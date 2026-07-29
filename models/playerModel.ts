import { db } from "@/db";
import { player } from "@/db/schema";
import { IPlayer } from "@/types/player";
import { desc, sql } from "drizzle-orm";

/**
 * Top sức mạnh
 */
export async function getTopPower(limit: number = 10):Promise<IPlayer[]> {
    return await db
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
}