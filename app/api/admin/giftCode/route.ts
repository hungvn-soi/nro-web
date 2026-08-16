import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { getAllGiftcodesV2 } from "@/models/giftcode";

export const GET = withErrorHandler(async (request: NextRequest) => {

    const getData = await getAllGiftcodesV2();

    return NextResponse.json({ success: true, message: "Lấy dữ liệu thành công", data: getData });
});