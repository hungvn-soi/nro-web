import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { ICreateGiftcode, IUpdateGiftcode } from "@/types/giftcode";
import { createGiftcode, updateGiftcode } from "@/models/giftcode";

export const PUT = withErrorHandler(async (request: NextRequest) => {
    const body: IUpdateGiftcode = await request.json();

    if (
        !body.code ||
        body.countLeft <= 0 ||
        !body.detail ||
        !body.expired
    ) {
        const err: any = new Error("Vui lòng kiểm tra lại dữ liệu");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    const data: IUpdateGiftcode = {
        id: body.id,
        code: body.code,
        countLeft: body.countLeft,
        detail: body.detail,
        expired: new Date(body.expired)
    };


    const update = await updateGiftcode(data);

    return NextResponse.json(
        {
            success: true,
            message: "Cập nhật thành công",
            data: update,
        },
        { status: 201 }
    );
});