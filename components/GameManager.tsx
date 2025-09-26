'use client'

import {useEffect} from "react";
import {useGames} from "@/components/GamesContext";


export default function GameManager() {
    const {setNewGames} = useGames() || {};
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/games`);

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch games. Status: ${response.status}`);
                }

                const games = await response.json();
                setNewGames?.(games);
            }
            catch (e) {
            console.error(e);
            setNewGames?.([])}
        };

        fetchGames().then(() => {})}, []);
    return null;
}