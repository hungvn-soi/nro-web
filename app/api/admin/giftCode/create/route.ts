import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { ICreateGiftcode } from "@/types/giftcode";
import { createGiftcode } from "@/models/giftcode";

export const POST = withErrorHandler(async (request: NextRequest) => {
    const body = await request.json();

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

    const data: ICreateGiftcode = {
        code: body.code,
        countLeft: Number(body.countLeft),
        detail: body.detail,
        expired: new Date(body.expired),
        datecreate: new Date(body.datecreate)
    };


    const create = await createGiftcode(data);

    return NextResponse.json(
        {
            success: true,
            message: "Tạo mới thành công",
            data: create,
        },
        { status: 201 }
    );
});