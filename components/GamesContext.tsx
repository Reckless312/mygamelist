'use client'

import React, {createContext, useState, useContext, ReactNode} from "react";

export type Game = {
    id: number;
    name: string;
    description: string;
    banner_url: string;
    releaseDate: string;
    price: number;
    images: string[];
    tags: string[];
}

type GamesContextType = {
    games: Game[];
    setNewGames: (games: Game[]) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export function GamesProvider({children}: {children: ReactNode | null}) {
    const [games, setGames] = useState<Game[]>([]);

    const setNewGames = (newGames: Game[]) => {
        setGames(newGames);
    }

    return (
        <GamesContext.Provider value={{games, setNewGames}}>
            {children}
        </GamesContext.Provider>
    );
}

export function useGames() {
    const context = useContext(GamesContext);
    if (!context) {
        console.error("useGames must be used within a GamesProvider");
    }
    return context;
}