import { getPaymentStatus } from "@/models/paymentModel";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const paymentId = Number(searchParams.get("id"));

        // Kiểm tra paymentId
        if (!Number.isInteger(paymentId) || paymentId <= 0) {
            return Response.json(
                {
                    success: false,
                    message: "Payment ID không hợp lệ",
                },
                { status: 400 }
            );
        }

        // Lấy trạng thái payment
        const payment = await getPaymentStatus(paymentId);

        if (!payment) {
            return Response.json(
                {
                    success: false,
                    message: "Không tìm thấy giao dịch",
                },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            data: payment,
        });

    } catch (error) {
        console.error("GET /api/payment/status error:", error);

        return Response.json(
            {
                success: false,
                message: "Có lỗi xảy ra khi kiểm tra giao dịch",
            },
            { status: 500 }
        );
    }
}