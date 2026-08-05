import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

import { createPayment, existsOrderCode } from "@/models/paymentModel";
import { getCurrentUser } from "@/lib/auth";
// import { getCurrentUser } from "@/lib/auth";

const ALLOWED_AMOUNTS = [
    10000,
    20000,
    50000,
    100000,
    200000,
    500000,
];

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Vui lòng đăng nhập.",
                },
                {
                    status: 401,
                }
            );
        }

        console.log(user.id);

        const body = await req.json();

        const amount = Number(body.amount);

        if (!ALLOWED_AMOUNTS.includes(amount)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Mệnh giá không hợp lệ.",
                },
                { status: 400 }
            );
        }

        //--------------------------------------------------

        let orderCode = generateOrderCode();

        while (await existsOrderCode(orderCode)) {
            orderCode = generateOrderCode();
        }

        //--------------------------------------------------

        const expiredAt = new Date(
            Date.now() + 2 * 60 * 1000
        );

        //--------------------------------------------------

        const payment = await createPayment({
            userId: user.id,
            amount,
            orderCode,
            paymentMethod: "bank",
            expiredAt,
        });

        //--------------------------------------------------

        const qrUrl = generateQrUrl({
            amount,
            orderCode,
        });

        //--------------------------------------------------

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

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
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

    // const params = new URLSearchParams({
    //     bank: process.env.BANK_CODE!,
    //     acc: process.env.BANK_ACCOUNT!,
    //     holder: process.env.BANK_HOLDER!,
    //     amount: amount.toString(),
    //     des: orderCode,
    //     template: "compact",
    //     showinfo: "false",
    // });

    return `https://vietqr.app/img?bank=MBBank&acc=VQRQAKYKZ3846&template=&amount=${amount}&des=${orderCode}&showinfo=false&holder=VO%20NGOC%20HUNG`
}