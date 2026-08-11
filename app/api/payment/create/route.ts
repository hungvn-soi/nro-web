import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

import { createPayment, existsOrderCode } from "@/models/paymentModel";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Vui lòng đăng nhập.",
                },
                { status: 401 }
            );
        }

        const body = await req.json();

        const amount = Number(body.amount);


        let orderCode = generateOrderCode();

        while (await existsOrderCode(orderCode)) {
            orderCode = generateOrderCode();
        }

        const expiredAt = new Date(Date.now() + 2 * 60 * 1000);

        const payment = await createPayment({
            userId: user.id,
            amount,
            orderCode,
            paymentMethod: "bank",
            expiredAt,
        });

        const qrUrl = generateQrUrl({
            amount,
            orderCode,
        });

        return NextResponse.json({
            success: true,
            data: {
                paymentId: payment.id,
                amount,
                orderCode,
                expiredAt,
                qrUrl,
            },
        });
    } catch (error) {
        // Chỉ log ở server (Terminal / PM2)
        console.error("========== CREATE PAYMENT ERROR ==========");
        console.error(error);
        console.error("==========================================");

        // Không trả lỗi thật cho client
        return NextResponse.json(
            {
                success: false,
                message: "Có lỗi xảy ra, vui lòng thử lại sau.",
            },
            {
                status: 500,
            }
        );
    }
}

function generateOrderCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    while (code.length < length) {
        const random = randomBytes(1)[0];
        code += chars[random % chars.length];
    }

    return code;
}

function generateQrUrl({
    amount,
    orderCode,
}: {
    amount: number;
    orderCode: string;
}) {
    const params = new URLSearchParams({
        bank: process.env.NEXT_PUBLIC_VIETQR_BANK!,
        acc: process.env.NEXT_PUBLIC_VIETQR_ACCOUNT!,
        template: "",
        amount: amount.toString(),
        des: orderCode,
        showinfo: process.env.NEXT_PUBLIC_VIETQR_SHOWINFO!,
        holder: process.env.NEXT_PUBLIC_VIETQR_HOLDER!,
    });

    return `https://vietqr.app/img?${params.toString()}`;
}