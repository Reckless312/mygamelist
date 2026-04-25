import { NextRequest, NextResponse } from "next/server";

const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";
const STEAM_PLAYER_SUMMARIES = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/";

function extractSteamId(claimedId: string): string | null {
    const match = claimedId.match(/https:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
    if (!match) {
        return null;
    }
    return match[1];
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const validationParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
        validationParams.set(key, value);
    });
    validationParams.set("openid.mode", "check_authentication");

    const validation = await fetch(STEAM_OPENID_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: validationParams.toString(),
    });

    const validationText = await validation.text();
    if (!validationText.includes("is_valid:true")) {
        return NextResponse.redirect(new URL("/login?error=steam_invalid", request.url));
    }

    const claimedId = searchParams.get("openid.claimed_id") ?? "";
    const steamId = extractSteamId(claimedId);
    if (!steamId) {
        return NextResponse.redirect(new URL("/login?error=steam_invalid", request.url));
    }

    let displayName = steamId;
    const steamApiKey = process.env.STEAM_API_KEY;
    if (steamApiKey) {
        const profileRes = await fetch(
            `${STEAM_PLAYER_SUMMARIES}?key=${steamApiKey}&steamids=${steamId}`
        );
        if (profileRes.ok) {
            const profileData = await profileRes.json();
            const player = profileData.response?.players?.[0];
            if (player?.personaname) {
                displayName = player.personaname;
            }
        }
    }

    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("steam_pending", JSON.stringify({ steamId, displayName }), {
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
    });

    return response;
}
