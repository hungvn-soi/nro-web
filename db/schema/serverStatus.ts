import {
    mysqlTable,
    int,
    tinyint,
    timestamp,
} from "drizzle-orm/mysql-core";

export const serverStatus = mysqlTable("server_status", {
    id: int("id").primaryKey(),

    online: tinyint("online")
        .default(1)
        .notNull(),

    playersOnline: int("players_online")
        .default(0)
        .notNull(),

    updatedAt: timestamp("updated_at")
        .notNull(),
});

export type ServerStatusSelect = typeof serverStatus.$inferSelect;
export type ServerStatusInsert = typeof serverStatus.$inferInsert;