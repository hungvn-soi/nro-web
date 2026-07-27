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
import { relations } from "drizzle-orm";

/* ===========================
   ACCOUNT
=========================== */

export const account = mysqlTable("account", {
    // Primary Key
    id: int("id").primaryKey().autoincrement(),

    // Thông tin tài khoản
    username: varchar("username", { length: 20 }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    email: text("email"),

    // Thời gian
    createTime: timestamp("create_time"),
    updateTime: timestamp("update_time"),
    lastTimeLogin: timestamp("last_time_login"),
    lastTimeLogout: timestamp("last_time_logout"),

    // Trạng thái
    ban: smallint("ban").default(0).notNull(),
    active: int("active").default(0).notNull(),
    isAdmin: tinyint("is_admin").default(0).notNull(),
    ipAddress: varchar("ip_address", { length: 50 }),

    // Thông tin game
    cash: int("cash").default(0).notNull(),
    danap: int("danap").default(0).notNull(),
    thoiVang: int("thoi_vang").default(0).notNull(),

    vip: int("vip").default(1).notNull(),
    hasReceivedVIP: int("hasReceivedVIP").default(0).notNull(),

    lastTimeReceivedVIP: bigint("lastTimeReceivedVIP", {
        mode: "number",
    })
        .default(0)
        .notNull(),

    bdPlayer: double("bd_player").default(1).notNull(),

    // Diễn đàn
    pointPost: int("point_post").default(0).notNull(),
    lastPost: int("last_post").default(0).notNull(),
});

/* ===========================
   PLAYER
=========================== */

export const player = mysqlTable("player", {
    // Primary Key
    id: int("id").primaryKey().autoincrement(),

    // Foreign Key
    accountId: int("account_id"),

    // Thông tin nhân vật
    name: varchar("name", { length: 20 }).notNull(),
    head: int("head").default(102).notNull(),
    gender: int("gender").notNull(),
    clanId: int("clan_id").default(-1).notNull(),

    haveTennisSpaceShip: tinyint("have_tennis_space_ship")
        .default(0)
        .notNull(),

    // Data game
    dataInventory: text("data_inventory").notNull(),
    dataLocation: text("data_location").notNull(),
    dataPoint: text("data_point").notNull(),
    dataTask: text("data_task").notNull(),

    // Trang bị
    itemsBody: text("items_body").notNull(),
    itemsBag: text("items_bag").notNull(),
    itemsBox: text("items_box").notNull(),

    // Đệ tử
    pet: text("pet").notNull(),

    // Thời gian
    createTime: timestamp("create_time"),
    firstTimeLogin: timestamp("firstTimeLogin"),

    // Rank
    rank: int("rank").default(0).notNull(),
});

/* ===========================
   RELATIONS
=========================== */

export const accountRelations = relations(account, ({ many }) => ({
    players: many(player),
}));

export const playerRelations = relations(player, ({ one }) => ({
    account: one(account, {
        fields: [player.accountId],
        references: [account.id],
    }),
}));

/* ===========================
   TYPES
=========================== */

export type AccountSelect = typeof account.$inferSelect;
export type AccountInsert = typeof account.$inferInsert;

export type PlayerSelect = typeof player.$inferSelect;
export type PlayerInsert = typeof player.$inferInsert;