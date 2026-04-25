import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pending = request.cookies.get("steam_pending")?.value;
    if (!pending) {
        return NextResponse.json({ error: "No pending Steam session" }, { status: 404 });
    }

    const response = NextResponse.json(JSON.parse(pending));
    response.cookies.delete("steam_pending");
    return response;
}
