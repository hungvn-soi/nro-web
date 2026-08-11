import { NextResponse } from "next/server";

export function withErrorHandler(handler: any) {
    return async (...args: any[]) => {
        try {
            return await handler(...args);
        } catch (error: any) {
            console.error("API Error:", error);

            // Lỗi đã được định nghĩa trước đó
            if (error.statusCode) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message,
                        code: error.code || "ERROR",
                    },
                    {
                        status: error.statusCode,
                    }
                );
            }

            // Lỗi MySQL: giá trị vượt quá giới hạn
            if (error.code === "ER_WARN_DATA_OUT_OF_RANGE") {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Giá trị nhập vào vượt quá giới hạn cho phép",
                        code: "DATA_OUT_OF_RANGE",
                    },
                    {
                        status: 400,
                    }
                );
            }

            // Lỗi database khác
            return NextResponse.json(
                {
                    success: false,
                    message: "Có lỗi xảy ra, vui lòng thử lại",
                    code: "INTERNAL_SERVER_ERROR",
                },
                {
                    status: 500,
                }
            );
        }
    };
}