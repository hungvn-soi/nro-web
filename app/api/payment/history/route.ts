import { getPaymentsByUserId } from "@/models/paymentModel";
import { IPaymentHistory } from "@/types/payment";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";


export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        // console.log("check user payment api : ", user )
        // =========================
        // Validate userId
        // =========================
        if (!user || !user.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Đăng nhập để hiển thị lịch sử giao dịch",
                    data: null,
                },
                { status: 400 }
            );
        }


        if (!Number.isInteger(user.id) || user.id <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Có lỗi thông tin người dùng f5 lại hoặc liên hệ Admin",
                    data: null,
                },
                { status: 400 }
            );
        }

        // =========================
        // Lấy lịch sử thanh toán
        // =========================
        const payments: IPaymentHistory[] | null =
            await getPaymentsByUserId(user.id);

        // =========================
        // Thành công
        // =========================
        return NextResponse.json(
            {
                success: true,
                message: "Lấy lịch sử thanh toán thành công",
                data: payments,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log lỗi ở server / PM2
        console.error("GET /api/payment/history error:", error);

        // Không trả error thật ra client
        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
                data: null,
            },
            { status: 500 }
        );
    }
}