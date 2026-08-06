import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const datasend = {
            ...body,
            action: "contact",
        }

        const res = await fetch('https://script.google.com/macros/s/AKfycby00wRFhCwo5QMqhWJ7Oce2YcOZgwRAlTPrKkPDa3fJo7gC0hjYF3FkWqTDlbOeocsc/exec', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datasend),
        });

        if (!res.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Không thể gửi báo lỗi",
                },
                { status: 500 }
            );
        }

        const result = await res.json();

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            { status: 500 }
        );
    }
}