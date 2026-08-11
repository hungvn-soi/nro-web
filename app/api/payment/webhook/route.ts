import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { paymentsV2 } from "@/db/schema/paymentsV2";
import { getPaymentBySePayTransactionId, getPendingPayment } from "@/models/paymentModel";
import { addCashAndRecharge } from "@/models/userModel";


// =====================================================
// SePay Webhook Payload
// =====================================================

interface ISePayWebhook {
    id: number;
    gateway?: string;
    transactionDate?: string;
    accountNumber?: string;
    subAccount?: string | null;
    code?: string | null;
    content?: string;
    transferType?: "in" | "out";
    description?: string;
    transferAmount: number;
    accumulated?: number;
    referenceCode?: string;
}

// =====================================================
// POST /api/payment/webhook
// =====================================================

export async function POST(req: Request) {
    try {
        // =================================================
        // 1. VERIFY WEBHOOK
        // =================================================

        // const sepayApiKey =
        //     process.env.SEPAY_WEBHOOK_API_KEY;

        // if (!sepayApiKey) {
        //     console.error(
        //         "[SEPAY] SEPAY_WEBHOOK_API_KEY chưa được cấu hình"
        //     );

        //     return NextResponse.json(
        //         {
        //             success: false,
        //             message: "Webhook configuration error",
        //         },
        //         {
        //             status: 500,
        //         }
        //     );
        // }

        // const authorization =
        //     req.headers.get("authorization");

        // const expectedAuthorization =
        //     `Apikey ${sepayApiKey}`;

        // if (authorization !== expectedAuthorization) {
        //     console.error(
        //         "[SEPAY] Unauthorized webhook request"
        //     );

        //     return NextResponse.json(
        //         {
        //             success: false,
        //             message: "Unauthorized",
        //         },
        //         {
        //             status: 401,
        //         }
        //     );
        // }


        // =================================================
        // 2. READ BODY
        // =================================================

        const data =
            (await req.json()) as ISePayWebhook;

        console.log(
            "[SEPAY] Webhook received:",
            data
        );


        // =================================================
        // 3. CHECK TRANSACTION ID
        // =================================================

        if (!data.id) {
            console.error(
                "[SEPAY] Missing transaction ID"
            );

            return NextResponse.json(
                {
                    success: false,
                    message: "Missing transaction ID",
                },
                {
                    status: 400,
                }
            );
        }

        const sepayTransactionId =
            String(data.id);


        // =================================================
        // 4. CHECK TRANSACTION ĐÃ XỬ LÝ CHƯA
        // =================================================

        const existedPayment =
            await getPaymentBySePayTransactionId(
                sepayTransactionId
            );

        if (existedPayment) {
            console.log(
                `[SEPAY] Transaction ${sepayTransactionId} đã được xử lý`
            );

            return NextResponse.json({
                success: true,
            });
        }


        // =================================================
        // 5. CHỈ XỬ LÝ GIAO DỊCH TIỀN VÀO
        // =================================================

        if (data.transferType !== "in") {
            console.log(
                `[SEPAY] Bỏ qua giao dịch OUT: ${sepayTransactionId}`
            );

            return NextResponse.json({
                success: true,
            });
        }


        // =================================================
        // 6. CHECK ORDER CODE
        // =================================================

        const orderCode =
            data.code?.trim();

        if (!orderCode) {
            console.error(
                "[SEPAY] Không tìm thấy orderCode",
                {
                    transactionId:
                        sepayTransactionId,

                    content:
                        data.content,
                }
            );

            /*
             * Không phải lỗi server.
             *
             * Không chuyển payment sang error.
             * Không cần retry webhook.
             */
            return NextResponse.json({
                success: true,
            });
        }


        // =================================================
        // 7. TÌM PAYMENT ĐANG PENDING
        // =================================================

        const payment =
            await getPendingPayment(orderCode);

        if (!payment) {
            console.error(
                "[SEPAY] Không tìm thấy payment pending",
                {
                    orderCode,

                    transactionId:
                        sepayTransactionId,
                }
            );

            return NextResponse.json({
                success: true,
            });
        }


        // =================================================
        // 8. CHECK AMOUNT
        // =================================================

        const webhookAmount =
            Number(data.transferAmount);

        const paymentAmount =
            Number(payment.amount);

        if (
            !Number.isInteger(webhookAmount) ||
            !Number.isInteger(paymentAmount)
        ) {
            console.error(
                "[SEPAY] Amount không hợp lệ",
                {
                    orderCode,

                    transactionId:
                        sepayTransactionId,

                    webhookAmount,

                    paymentAmount,
                }
            );

            return NextResponse.json({
                success: true,
            });
        }


        // Số tiền phải khớp tuyệt đối
        if (webhookAmount !== paymentAmount) {
            console.error(
                "[SEPAY] Amount không khớp",
                {
                    orderCode,

                    transactionId:
                        sepayTransactionId,

                    webhookAmount,

                    paymentAmount,

                    userId:
                        payment.userId,
                }
            );

            return NextResponse.json({
                success: true,
            });
        }


        // =================================================
        // 9. DATABASE TRANSACTION
        // =================================================

        await db.transaction(async (tx) => {

            // ---------------------------------------------
            // 9.1. Lấy lại payment
            // ---------------------------------------------

            const currentPayment =
                await tx.query.paymentsV2.findFirst({
                    where: and(
                        eq(
                            paymentsV2.id,
                            payment.id
                        ),

                        eq(
                            paymentsV2.status,
                            "pending"
                        )
                    ),
                });


            /*
             * Một webhook khác có thể đã xử lý payment
             * trong khoảng thời gian vừa rồi.
             */
            if (!currentPayment) {
                console.log(
                    `[SEPAY] Payment ${payment.id} không còn pending`
                );

                return;
            }


            // ---------------------------------------------
            // 9.2. Kiểm tra transaction ID lần nữa
            // ---------------------------------------------

            const existedTransaction =
                await tx.query.paymentsV2.findFirst({
                    where: eq(
                        paymentsV2.sepayTransactionId,
                        sepayTransactionId
                    ),
                });


            if (existedTransaction) {
                console.log(
                    `[SEPAY] Transaction ${sepayTransactionId} đã tồn tại`
                );

                return;
            }


            // ---------------------------------------------
            // 9.3. Kiểm tra amount lần cuối
            // ---------------------------------------------

            const currentPaymentAmount =
                Number(currentPayment.amount);

            if (
                currentPaymentAmount !==
                webhookAmount
            ) {
                throw new Error(
                    `[SEPAY] Amount không khớp trong transaction. ` +
                    `Payment=${currentPaymentAmount}, ` +
                    `Webhook=${webhookAmount}`
                );
            }


            // ---------------------------------------------
            // 9.4. COMPLETE PAYMENT
            // ---------------------------------------------

            await tx
                .update(paymentsV2)
                .set({
                    status: "complete",

                    sepayTransactionId:
                        sepayTransactionId,
                })
                .where(
                    and(
                        eq(
                            paymentsV2.id,
                            currentPayment.id
                        ),

                        eq(
                            paymentsV2.status,
                            "pending"
                        )
                    )
                );


            // ---------------------------------------------
            // 9.5. CỘNG TIỀN USER
            // ---------------------------------------------
            //
            // userId + amount lấy từ paymentsV2
            //
            // Không lấy từ webhook.
            //

            await addCashAndRecharge(
                tx,
                currentPayment.userId,
                currentPayment.amount
            );
        });


        // =================================================
        // 10. SUCCESS
        // =================================================

        console.log(
            "[SEPAY] Thanh toán thành công",
            {
                orderCode,

                transactionId:
                    sepayTransactionId,

                userId:
                    payment.userId,

                amount:
                    payment.amount,
            }
        );


        return NextResponse.json({
            success: true,
        });


    } catch (error) {

        // =================================================
        // ERROR
        // =================================================

        console.error(
            "[SEPAY] Webhook error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}