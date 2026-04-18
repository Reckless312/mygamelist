'use client'

import React, {createContext, useState} from "react";

type AuthenticationContextType = {
    isAuthenticated: boolean | undefined;
    username: string;
    isServerDown: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUsername: (username: string) => void;
    setIsServerDown: (isServerDown: boolean) => void;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationProvider({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [username, setUsername] = useState<string>("");
    const [isServerDown, setIsServerDown] = useState<boolean>(false);

    return (
        <AuthenticationContext.Provider value={{isAuthenticated, username, isServerDown, setIsAuthenticated, setUsername, setIsServerDown}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthentication() {
    const context = React.useContext(AuthenticationContext);
    if (context === undefined) {
        throw new Error("useAuthentication must be used within a AuthenticationProvider");
    }
    return context;
}