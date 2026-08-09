// lib/api/withErrorHandler.ts
import { NextRequest, NextResponse } from "next/server";

export function withErrorHandler(handler: (req: NextRequest, ctx?: any) => Promise<NextResponse>) {
    return async (req: NextRequest, ctx?: any) => {
        try {
            return await handler(req, ctx);
        } catch (error: any) {
            console.error("API_ERROR:", error);
            return NextResponse.json(
                {
                    success: false,
                    message: error.message || "Đã có lỗi xảy ra",
                    error: error.code || "INTERNAL_SERVER_ERROR",
                },
                { status: error.statusCode || 500 }
            );
        }
    };
}