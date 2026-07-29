import {
    mysqlTable,
    int,
    varchar,
    text,
    timestamp,
    tinyint,
} from "drizzle-orm/mysql-core";

export const player = mysqlTable("player", {
    id: int("id").primaryKey().autoincrement(),

    accountId: int("account_id"),

    name: varchar("name", { length: 20 }).notNull(),

    head: int("head").default(102).notNull(),

    gender: int("gender").notNull(),

    clanId: int("clan_id").default(-1).notNull(),

    haveTennisSpaceShip: tinyint("have_tennis_space_ship")
        .default(0)
        .notNull(),

    dataInventory: text("data_inventory").notNull(),

    dataLocation: text("data_location").notNull(),

    dataPoint: text("data_point").notNull(),

    dataTask: text("data_task").notNull(),

    itemsBody: text("items_body").notNull(),

    itemsBag: text("items_bag").notNull(),

    itemsBox: text("items_box").notNull(),

    pet: text("pet").notNull(),

    createTime: timestamp("create_time"),

    firstTimeLogin: timestamp("firstTimeLogin"),

    rank: int("rank").default(0).notNull(),
});

export type PlayerSelect = typeof player.$inferSelect;
export type PlayerInsert = typeof player.$inferInsert;