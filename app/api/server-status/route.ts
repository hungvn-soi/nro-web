import { NextResponse } from "next/server";
import { getServerStatus } from "@/models/serverStatus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const data = await getServerStatus();

    return NextResponse.json(data, {
        headers: {
            "Cache-Control": "no-store",
        },
    });
}