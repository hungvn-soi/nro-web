import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";
import { getAllRechargePackages } from "@/models/rechargePackageModel";

export const GET = withErrorHandler(async (request: NextRequest) => {

    const getData = await getAllRechargePackages();

    return NextResponse.json({ success: true, message: "Lấy dữ liệu thành công", data: getData });
});