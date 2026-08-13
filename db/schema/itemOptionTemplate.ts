import {
    int,
    mysqlTable,
    varchar,
} from "drizzle-orm/mysql-core";

export const itemOptionTemplate = mysqlTable("item_option_template", {
    id: int("id").primaryKey(),

    name: varchar("NAME", {
        length: 255,
    }).notNull(),
});