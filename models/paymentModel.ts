import { db } from "@/db";
import { paymentsV2 } from "@/db/schema/paymentsV2";
import { ICreatePaymentInput, IPaymentHistory, IPaymentStatus, IPaymentTableALL } from "@/types/payment";
import {
    and,
    eq,
    sql,
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
 * Lấy thông tin status theo payment ID
 * @param paymentId 
 * @returns 
 */
export async function getPaymentStatus(paymentId: number) {
    const result = await db
        .select({
            id: paymentsV2.id,
            status: paymentsV2.status,
        })
        .from(paymentsV2)
        .where(eq(paymentsV2.id, paymentId))
        .limit(1);

    return result[0] || null;
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
export async function getPaymentsByUserId(userId: number) : Promise<IPaymentHistory[] | null> {
    return await db.query.paymentsV2.findMany({
        columns: {
            id: true,
            userId: true,
            orderCode: true,
            paymentMethod: true,
            amount: true,
            createdAt: true,
            status: true,
        },
        where: eq(paymentsV2.userId, userId),
        orderBy: (payments, { desc }) => [
            desc(payments.createdAt),
        ],
    });
}

/**
 * Lấy payment đang ở trạng thái pending theo orderCode
 */
export async function getPendingPayment(
    orderCode: string
) {
    console.log("check orderCode: ", orderCode)
    const check1 = await db.query.paymentsV2.findFirst({
        where: and(
            eq(paymentsV2.orderCode, orderCode),
            eq(paymentsV2.status, "pending")
        ),
    });

    console.log("check check: ", check1)

    return check1
}


/**
 * Status thống kê payment
 */

export async function getPaymentStats(): Promise<IPaymentStatus> {
    const result = await db
        .select({
            // Tổng doanh thu
            // Chỉ tính những giao dịch đã complete
            totalRevenue: sql<number>`
                COALESCE(
                    SUM(
                        CASE
                            WHEN ${paymentsV2.status} = 'complete'
                            THEN ${paymentsV2.amount}
                            ELSE 0
                        END
                    ),
                    0
                )
            `,

            // Tổng tất cả giao dịch
            totalTransactions: sql<number>`
                COUNT(*)
            `,

            // Giao dịch thành công
            completed: sql<number>`
                COALESCE(
                    SUM(
                        CASE
                            WHEN ${paymentsV2.status} = 'complete'
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                )
            `,

            // Giao dịch đang chờ xử lý
            pending: sql<number>`
                COALESCE(
                    SUM(
                        CASE
                            WHEN ${paymentsV2.status} = 'pending'
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                )
            `,

            // Giao dịch lỗi
            error: sql<number>`
                COALESCE(
                    SUM(
                        CASE
                            WHEN ${paymentsV2.status} = 'error'
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                )
            `,
        })
        .from(paymentsV2);

    const data = result[0];

    return {
        totalRevenue: Number(data?.totalRevenue ?? 0),
        totalTransactions: Number(data?.totalTransactions ?? 0),
        completed: Number(data?.completed ?? 0),
        pending: Number(data?.pending ?? 0),
        error: Number(data?.error ?? 0),
    };
}

/**
 * Lấy tất cả giao dịch thanh toán
 * Dùng cho Admin View
 */
export async function getAllPayments(): Promise<IPaymentTableALL[]> {
    return await db.query.paymentsV2.findMany({
        orderBy: (payments, { desc }) => [
            desc(payments.createdAt),
        ],
    });
}