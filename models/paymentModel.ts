import { db } from "@/db";
import { paymentsV2 } from "@/db/schema/paymentsV2";
import { ICreatePaymentInput } from "@/types/payment";
import {
    and,
    eq,
} from "drizzle-orm";


/**
 * Tạo giao dịch mới
 */
export async function createPayment(data: ICreatePaymentInput) {
    const result = await db
        .insert(paymentsV2)
        .values({
            userId: data.userId,
            amount: data.amount,
            orderCode: data.orderCode,
            paymentMethod: data.paymentMethod,
            expiredAt: data.expiredAt,
            status: "pending",
        })
        .$returningId();

    return result[0];
}

/**
 * Kiểm tra OrderCode đã tồn tại chưa
 */
export async function existsOrderCode(orderCode: string) {
    const payment = await db.query.paymentsV2.findFirst({
        where: eq(paymentsV2.orderCode, orderCode),
    });

    return !!payment;
}

/**
 * Lấy giao dịch theo ID
 */
export async function getPaymentById(id: number) {
    return await db.query.paymentsV2.findFirst({
        where: eq(paymentsV2.id, id),
    });
}

/**
 * Lấy giao dịch theo OrderCode
 */
export async function getPaymentByOrderCode(orderCode: string) {
    return await db.query.paymentsV2.findFirst({
        where: eq(paymentsV2.orderCode, orderCode),
    });
}

/**
 * Lấy giao dịch theo SePay Transaction ID
 * (chống webhook gọi nhiều lần)
 */
export async function getPaymentBySePayTransactionId(
    sepayTransactionId: string
) {
    return await db.query.paymentsV2.findFirst({
        where: eq(
            paymentsV2.sepayTransactionId,
            sepayTransactionId
        ),
    });
}

/**
 * Hoàn thành giao dịch
 */
export async function completePayment(
    id: number,
    sepayTransactionId: string
) {
    await db
        .update(paymentsV2)
        .set({
            status: "complete",
            sepayTransactionId,
        })
        .where(eq(paymentsV2.id, id));
}

/**
 * Đánh dấu giao dịch hết hạn
 */
export async function expirePayment(id: number) {
    await db
        .update(paymentsV2)
        .set({
            status: "expired",
        })
        .where(eq(paymentsV2.id, id));
}

/**
 * Đánh dấu giao dịch lỗi
 */
export async function errorPayment(id: number) {
    await db
        .update(paymentsV2)
        .set({
            status: "error",
        })
        .where(eq(paymentsV2.id, id));
}

/**
 * Lấy lịch sử nạp của 1 user
 */
export async function getPaymentsByUserId(userId: number) {
    return await db.query.paymentsV2.findMany({
        where: eq(paymentsV2.userId, userId),
        orderBy: (payments, { desc }) => [
            desc(payments.createdAt),
        ],
    });
}

/**
 * Kiểm tra giao dịch pending còn hiệu lực
 */
export async function getPendingPayment(
    orderCode: string
) {
    return await db.query.paymentsV2.findFirst({
        where: and(
            eq(paymentsV2.orderCode, orderCode),
            eq(paymentsV2.status, "pending")
        ),
    });
}