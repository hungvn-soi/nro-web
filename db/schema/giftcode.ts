import {
    int,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const giftcode = mysqlTable("giftcode", {
    id: int("id").primaryKey().autoincrement(),

    code: varchar("code", {
        length: 255,
    }).notNull(),

    countLeft: int("count_left").notNull(),

    /**
     * JSON phần thưởng của giftcode.
     *
     * Ví dụ:
     *
     * [
     *   {
     *     "id": 6,
     *     "quantity": 10,
     *     "options": [
     *       {
     *         "id": 6,
     *         "param": 5000
     *       }
     *     ]
     *   }
     * ]
     */
    detail: text("detail").notNull(),

    datecreate: timestamp("datecreate", {
        mode: "date",
    }).notNull(),

    expired: timestamp("expired", {
        mode: "date",
    }).notNull(),
});