'use client'

import { useAuthentication } from "@/components/AuthenticationContext";
import { useEffect } from "react";
import { routes } from "@/lib/apiRequest";

export default function AuthenticationManager() {
    const { setUsername, setIsAuthenticated, setIsServerDown, setAvatarUrl, setRole } = useAuthentication() || {};

    useEffect(() => {
        const init = async () => {
            try {
                const hqResponse = await fetch(routes.auth.hq, { credentials: "include" });

                if (hqResponse.status === 200) {
                    const data = await hqResponse.json();
                    if (data.username !== undefined && data.username !== "") {
                        setUsername(data.username);
                        setAvatarUrl(data.avatarUrl ?? null);
                        setRole(data.role ?? 'user');
                        setIsAuthenticated(true);
                        return;
                    }
                }

                const profileResponse = await fetch(routes.auth.steamProfile);
                if (!profileResponse.ok) {
                    setUsername("");
                    setIsAuthenticated(false);
                    return;
                }

                const { steamId, displayName, avatarUrl } = await profileResponse.json();
                const loginResponse = await fetch(routes.auth.loginSteam, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ steamId, displayName, avatarUrl }),
                    credentials: "include",
                });

                if (!loginResponse.ok) {
                    setUsername("");
                    setIsAuthenticated(false);
                    return;
                }

                const hqRetry = await fetch(routes.auth.hq, { credentials: "include" });
                if (hqRetry.status === 200) {
                    const data = await hqRetry.json();
                    setUsername(data.username);
                    setAvatarUrl(data.avatarUrl ?? null);
                    setRole(data.role ?? 'user');
                    setIsAuthenticated(true);
                    return;
                }

                setUsername("");
                setIsAuthenticated(false);
            } catch {
                setIsServerDown(true);
                setIsAuthenticated(false);
            }
        };

        init();
    }, [setUsername, setIsAuthenticated, setIsServerDown, setAvatarUrl, setRole]);

    return null;
}
