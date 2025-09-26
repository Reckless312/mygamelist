'use client'

import React, {createContext, useState} from "react";

type AuthenticationContextType = {
    isAuthenticated: boolean | undefined;
    username: string
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUsername: (username: string) => void;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationProvider({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [username, setUsername] = useState<string>("");

    return (
        <AuthenticationContext.Provider value={{isAuthenticated, username, setIsAuthenticated, setUsername}}>
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