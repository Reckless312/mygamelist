'use client'

import {useAuthentication} from "@/components/AuthenticationContext";
import {useEffect} from "react";

export default function AuthenticationManager() {
    const {setUsername, setIsAuthenticated} = useAuthentication() || {};

    useEffect(() => {
        const getUsername = async () => {
            if (process.env.NEXT_PUBLIC_API_USERNAME === undefined) {
                return;
            }

            const response = await fetch(process.env.NEXT_PUBLIC_API_USERNAME, {
                credentials: "include"
            })

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
        }

        getUsername().then();
    }, [])

    return null;
}