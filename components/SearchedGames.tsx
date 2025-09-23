'use client'

import {useGames} from "@/components/GamesContext";
import {Card} from "@/components/ui/card";
import Image from "next/image";

export default function SearchedGames({query}: {query: string}) {
    const { games } = useGames() || {}
    const form = document.querySelector('.search-form') as HTMLFormElement;

    if (!games || games.length === 0) {
        return null
    }

    if(form) {
        form.reset();
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
    {games.filter((game)=>game.name.toLowerCase().includes(query.toLowerCase())).map((game) => (
            <Card
                key={game.id}
                className="flex gap-4 p-4 shadow-sm bg-[#0F0F14] border-0 text-white items-start h-40"
            >
                <Image
                    src={game.banner_url}
                    alt={game.name}
                    width={140}
                    height={60}
                    className="rounded-md object-cover"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">{game.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            Release: {game.releaseDate}
                        </p>
                    </div>
                </div>
            </Card>))}
        </div>
    )
}