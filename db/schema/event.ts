import {
    mysqlTable,
    int,
    varchar,
    tinyint,
    date,
    mysqlEnum,
    text,
} from "drizzle-orm/mysql-core";

export const event = mysqlTable("events", {
    id: int("id").primaryKey().autoincrement(),

    name: varchar("name", { length: 100 }).notNull(),

    state: tinyint("state").default(0).notNull(),

    description: text("description"),

    image: varchar("image", { length: 255 }),

    badge: mysqlEnum("badge", ["NONE", "NEW", "HOT"])
        .default("NONE")
        .notNull(),

    startDate: date("start_date"),

    endDate: date("end_date"),
});

export type EventSelect = typeof event.$inferSelect;
export type EventInsert = typeof event.$inferInsert;