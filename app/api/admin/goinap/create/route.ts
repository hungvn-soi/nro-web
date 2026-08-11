import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { createRechargePackage } from "@/models/rechargePackageModel";
import { ICreateRechargePackage } from "@/types/rechargePackage";

export const POST = withErrorHandler(async (request: NextRequest) => {
    const body: ICreateRechargePackage = await request.json();

    if (
        body.sortOrder === undefined ||
        body.price === undefined ||
        // body.price === 0 ||
        body.gem === undefined
    ) {
        const err: any = new Error("Vui lòng kiểm tra lại dữ liệu");
        err.statusCode = 400;
        err.code = "BAD_REQUEST";
        throw err;
    }

    const create = await createRechargePackage(body);

    return NextResponse.json(
        { success: true, message: "Tạo mới thành công", data: create },
        { status: 201 }
    );
});