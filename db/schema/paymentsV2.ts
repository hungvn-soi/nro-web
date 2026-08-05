import {
    int,
    mysqlEnum,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";
import { account } from "./account";

export const paymentsV2 = mysqlTable("payments_v2", {
    // ID giao dịch
    id: int("id")
        .autoincrement()
        .primaryKey(),

    // Tài khoản thực hiện giao dịch
    userId: int("user_id")
        .notNull()
        .references(() => account.id),

    // Mã giao dịch do hệ thống sinh (VD: A82XQK)
    orderCode: varchar("order_code", {
        length: 20,
    })
        .notNull()
        .unique(),

    // Mã giao dịch trả về từ SePay sau khi webhook thành công
    sepayTransactionId: varchar(
        "sepay_transaction_id",
        {
            length: 100,
        }
    ),

    // Hình thức thanh toán
    paymentMethod: mysqlEnum("payment_method", [
        "bank",
        "card",
    ])
        .default("bank")
        .notNull(),

    // Số tiền cần thanh toán
    amount: int("amount")
        .notNull(),

    // Thời gian tạo giao dịch
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),

    // Thời gian hết hạn QR
    expiredAt: timestamp("expired_at")
        .notNull(),

    // Trạng thái giao dịch
    status: mysqlEnum("status", [
        "pending",
        "complete",
        "expired",
        "error",
    ])
        .default("pending")
        .notNull(),
});

export type PaymentV2Select = typeof paymentsV2.$inferSelect;
export type PaymentV2Insert = typeof paymentsV2.$inferInsert;