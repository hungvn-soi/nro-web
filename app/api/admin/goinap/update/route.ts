import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { updateRechargePackage } from "@/models/rechargePackageModel";

export const PUT = withErrorHandler(async (request: NextRequest) => {
    const id = Number(new URL(request.url).searchParams.get("id"));

    if (!id) {
        const err: any = new Error("Thiếu ID gói nạp");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    if (id <= 0 || !Number.isInteger(id)) {
        const err: any = new Error("ID không hợp lệ");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
        const err: any = new Error("Thiếu dữ liệu cập nhật");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    const updated = await updateRechargePackage(id, data);

    if (!updated) {
        const err: any = new Error("Không tìm thấy gói nạp");
        err.statusCode = 404;
        err.code = "NOT_FOUND";
        throw err;
    }

    return NextResponse.json({
        success: true,
        message: "Cập nhật thành công",
        data: {
            id,
            ...data,
        },
    });
});