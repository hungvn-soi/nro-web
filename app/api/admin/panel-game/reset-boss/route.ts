import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/withErrorHandler";

const GAME_SERVER_URL = process.env.GAME_SERVER_URL;
const GAME_SERVER_TOKEN = process.env.GAME_SERVER_TOKEN;

export const POST = withErrorHandler(async () => {
    // if (!GAME_SERVER_URL || !GAME_SERVER_TOKEN) {
    //     const error = new Error("Chưa cấu hình Game Server");
    //     (error as any).statusCode = 500;
    //     (error as any).code = "GAME_SERVER_CONFIG_ERROR";
    //     throw error;
    // }

    const response = await fetch(
        `http://103.78.1.66:9008/api/reset-boss`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer cd_gi_do_kho_doan_va_dai`,
            },
            cache: "no-store",
        }
    );

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const error = new Error(
            typeof data === "string"
                ? data
                : data?.message || "Reset boss thất bại"
        );

        (error as any).statusCode = response.status;
        (error as any).code = "RESET_BOSS_ERROR";

        throw error;
    }

    return NextResponse.json({
        success: true,
        message: "Reset boss thành công",
        data,
    });
});