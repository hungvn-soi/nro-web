import {
    bigint,
    int,
    mysqlTable,
    smallint,
    tinyint,
    varchar,
} from "drizzle-orm/mysql-core";

export const itemTemplate = mysqlTable("item_template", {
    id: int("id").primaryKey(),

    type: int("TYPE").notNull(),

    gender: smallint("gender").notNull(),

    name: varchar("NAME", {
        length: 255,
    }).notNull(),

    description: varchar("description", {
        length: 255,
    }).notNull(),

    level: int("level").notNull().default(0),

    iconId: int("icon_id").notNull(),

    part: int("part").notNull(),

    isUpToUp: tinyint("is_up_to_up").notNull(),

    powerRequire: bigint("power_require", {
        mode: "number",
    }).notNull(),

    gold: int("gold").notNull().default(0),

    gem: int("gem").notNull().default(0),

    head: int("head").notNull().default(-1),

    body: int("body").notNull().default(-1),

    leg: int("leg").notNull().default(-1),
});