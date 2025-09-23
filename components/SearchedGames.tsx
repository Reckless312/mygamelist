'use client'

import { useGames } from "@/components/GamesContext";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import SearchResultsBar from "@/components/SearchResultsBar";
import SearchPagination from "@/components/SearchPagination";

export default function SearchedGames({ query }: { query: string }) {
    const { games } = useGames() || {};

    const foundGames =
        games?.filter((game) =>
            game.name.toLowerCase().includes(query.toLowerCase())
        ) || [];

    const [sortOption, setSortOption] = useState<"name-asc" | "name-desc" | "newest" | "oldest">("name-asc");

    useEffect(() => {
        const form = document.querySelector(".search-form") as | HTMLFormElement | null;

        if (form) {
            form.reset();
        }
    }, [query]);

    const sortedGames = useMemo(() => {
        if (sortOption === "name-asc") {
            return foundGames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "name-desc") {
            return foundGames.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === "newest") {
            return foundGames.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        } else if (sortOption === "oldest") {
            return foundGames.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
        }
        return foundGames;
    }, [foundGames, sortOption])

    if (!games || games.length === 0) {
        return null;
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
            <SearchResultsBar length={foundGames.length} query={query} onSortChange={setSortOption} currentSortOption={sortOption}/>

            <SearchPagination
                games={sortedGames}
                query={query}
                renderGameAction={(game) => (
                    <Card key={game.id} className="flex gap-4 p-4 shadow-sm bg-[#0F0F14] border-0 text-white items-start h-40">
                        <Image src={game.banner_url} alt={game.name} width={140} height={60} className="rounded-md object-cover"/>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{game.name}</h2>
                                <p className="text-sm text-muted-foreground">Release: {game.releaseDate}</p>
                            </div>
                        </div>
                    </Card>
                )}
            />
        </div>
    );
}
