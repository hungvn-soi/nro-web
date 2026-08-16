import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { deleteGiftcode } from "@/models/giftcode";


export const DELETE = withErrorHandler(async (request: NextRequest) => {
    const id = Number(new URL(request.url).searchParams.get("id"));

    if (!id) {
        const err: any = new Error("Thiếu ID giftCode");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    if(id < 0){
        const err: any = new Error("id không hợp lệ");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }
    const deleted = await deleteGiftcode(id);

    return NextResponse.json({ success: true, message: "Xóa thành công", data: { id } });
});