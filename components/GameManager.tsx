'use client'

import {useEffect} from "react";
import {useGames} from "@/components/GamesContext";


export default function GameManager() {
    const {setNewGames} = useGames() || {};

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`https://nodejs-serverless-function-express-gamma-one.vercel.app/api/games`);
                const games = await response.json();
                setNewGames?.(games);
            }
            catch (e) {
            console.error(e);}
        };

        fetchGames().then(() => {})}, []);
    return null;
}