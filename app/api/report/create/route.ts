import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 10000);

        const res = await fetch(
            "https://script.google.com/macros/s/AKfycby00wRFhCwo5QMqhWJ7Oce2YcOZgwRAlTPrKkPDa3fJo7gC0hjYF3FkWqTDlbOeocsc/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...body,
                    action: "report",
                }),
                signal: controller.signal,
            }
        );

        clearTimeout(timeout);

        if (!res.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Google Script lỗi (${res.status})`,
                },
                { status: res.status }
            );
        }

        let result;

        try {
            result = await res.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Google Script trả về dữ liệu không hợp lệ",
                },
                { status: 500 }
            );
        }

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: result.message || "Không thể gửi báo lỗi",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.name === "AbortError") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kết nối quá thời gian chờ",
                },
                { status: 408 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            { status: 500 }
        );
    }
}