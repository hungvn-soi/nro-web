import {
    mysqlTable,
    int,
    timestamp,
} from "drizzle-orm/mysql-core";

export const giftcodeUsed = mysqlTable("giftcode_used", {
    accountId: int("account_id").notNull(),

    giftcodeId: int("giftcode_id").notNull(),

    usedAt: timestamp("used_at").notNull(),
});