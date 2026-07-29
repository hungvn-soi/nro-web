import {
    mysqlTable,
    int,
    varchar,
    text,
    timestamp,
    tinyint,
    smallint,
    bigint,
    double,
} from "drizzle-orm/mysql-core";

export const account = mysqlTable("account", {
    id: int("id").primaryKey().autoincrement(),

    username: varchar("username", { length: 20 }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    email: text("email"),

    createTime: timestamp("create_time"),
    updateTime: timestamp("update_time"),
    lastTimeLogin: timestamp("last_time_login"),
    lastTimeLogout: timestamp("last_time_logout"),

    ban: smallint("ban").default(0).notNull(),
    active: int("active").default(0).notNull(),
    isAdmin: tinyint("is_admin").default(0).notNull(),
    ipAddress: varchar("ip_address", { length: 50 }),

    cash: int("cash").default(0).notNull(),
    danap: int("danap").default(0).notNull(),
    thoiVang: int("thoi_vang").default(0).notNull(),

    vip: int("vip").default(1).notNull(),
    hasReceivedVIP: int("hasReceivedVIP").default(0).notNull(),

    lastTimeReceivedVIP: bigint("lastTimeReceivedVIP", {
        mode: "number",
    }).default(0).notNull(),

    bdPlayer: double("bd_player").default(1).notNull(),

    pointPost: int("point_post").default(0).notNull(),
    lastPost: int("last_post").default(0).notNull(),
});

export type AccountSelect = typeof account.$inferSelect;
export type AccountInsert = typeof account.$inferInsert;