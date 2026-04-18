'use client'

import {useAuthentication} from "@/components/AuthenticationContext";
import {useEffect} from "react";
import {routes} from "@/lib/apiRequest";

export default function AuthenticationManager() {
    const {setUsername, setIsAuthenticated, setIsServerDown} = useAuthentication() || {};

    useEffect(() => {
        const getUsername = async () => {
            try {
                const response = await fetch(routes.auth.hq, { credentials: "include" })

                if (response.status !== 200) {
                    setUsername("");
                    setIsAuthenticated(false);
                    return;
                }

                const data = await response.json();

                if (data.username === undefined) {
                    setUsername("");
                    setIsAuthenticated(false);
                    return;
                }

                setUsername(data.username);

                if (data.username !== "") {
                    setIsAuthenticated(true);
                }
            } catch {
                setIsServerDown(true);
                setIsAuthenticated(false);
            }
        }

        getUsername().then();
    }, [setUsername, setIsAuthenticated, setIsServerDown])

    return null;
}