'use client'

import { Card } from "@/components/ui/card";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import SortAndStatistics from "@/components/search page/SortAndStatistics";
import Pagination from "@/components/search page/Pagination";
import Link from "next/link";
import {Game} from "@/lib";

export default function Results({ query, games }: { query: string, games: Game[] }) {
    const foundGames = useMemo(() => {
        return games?.filter((game) => game.name.toLowerCase().includes(query.toLowerCase())) || [];},
        [games, query]);

    const [sortOption, setSortOption] = useState<"name-asc" | "name-desc" | "newest" | "oldest">("name-asc");

    useEffect(() => {
        const form = document.querySelector(".search-form") as | HTMLFormElement | null;

        if (form) {
            form.reset();
        }
    }, [query]);

    const sortedGames = useMemo(() => {
        const copyOfFoundGames = [...foundGames];
        if (sortOption === "name-asc") {
            return copyOfFoundGames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "name-desc") {
            return copyOfFoundGames.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === "newest") {
            return copyOfFoundGames.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        } else if (sortOption === "oldest") {
            return copyOfFoundGames.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
        }
        return copyOfFoundGames;
    }, [foundGames, sortOption])

    if (!games || games.length === 0) {
        return null;
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
            <SortAndStatistics length={foundGames.length} query={query} onSortChange={setSortOption} currentSortOption={sortOption}/>
            <Pagination games={sortedGames} query={query} renderGameAction={(game) => (
                <Link href={`/game/${game.id}`} key={game.id}>
                    <Card key={game.id} className="flex gap-4 p-4 shadow-sm bg-[#0F0F14] border-0 text-white items-start h-40">
                        <Image src={game.banner_url} quality={100} alt={game.name} width={140} height={60} className="rounded-md object-cover"/>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-mono">{game.name}</h2>
                                <p className="text-sm text-muted-foreground">Release: {game.releaseDate}</p>
                            </div>
                        </div>
                    </Card>
                </Link>)}
            />
        </div>
    );
}
