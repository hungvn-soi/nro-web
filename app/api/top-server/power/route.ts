import { NextResponse } from "next/server";
import { getTopPower } from "@/models/playerModel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const data = await getTopPower();

    return NextResponse.json(data, {
        headers: {
            "Cache-Control": "no-store",
        },
    });
}