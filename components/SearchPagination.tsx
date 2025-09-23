'use client'

import { useSearchParams } from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import { Game } from "@/components/GamesContext";

export default function SearchPagination({games, query, renderGameAction,}: { games: Game[]
    query: string; renderGameAction: (game: Game) => React.ReactNode; }) {

    const searchParams = useSearchParams();
    const itemsOnPage = 4;
    const currentPage = Number(searchParams.get("page")) || 1;

    const [visibleItems, setVisibleItems] = useState(currentPage * itemsOnPage);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const gamesOnPage = games.slice(0, visibleItems);

    useEffect(() => {
        if (!games.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && gamesOnPage.length < games.length) {
                    setVisibleItems((prev) => prev + itemsOnPage);
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [gamesOnPage.length, games.length, itemsOnPage]);

    useEffect(() => {
        setVisibleItems(itemsOnPage);
    }, [query, itemsOnPage]);

    return (
        <>
            {gamesOnPage.map((game) => renderGameAction(game))}

            {gamesOnPage.length < games.length && (
                <div ref={loaderRef} className="h-10" />
            )}
        </>
    );
}
