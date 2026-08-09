import {
    mysqlTable,
    int,
    tinyint,
    timestamp,
} from "drizzle-orm/mysql-core";

export const rechargePackages = mysqlTable("recharge_packages", {
    id: int("id")
        .autoincrement()
        .primaryKey(),

    price: int("price")
        .notNull(),

    gem: int("gem")
        .notNull(),

    status: tinyint("status")
        .notNull()
        .default(1),

    sortOrder: int("sort_order")
        .notNull()
        .default(0),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
        .onUpdateNow()
        .notNull(),
});