'use client'

import { useGames } from "@/components/GamesContext"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function GamesPage() {
    const { games } = useGames() || {}

    if (!games || games.length === 0) {
        return null
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
            {games.map((game) => (
                <Card
                    key={game.id}
                    className="flex gap-4 p-4 shadow-sm bg-[#0F0F14] border-0 text-white items-start"
                >
                    <Image
                        src={game.banner_url}
                        alt={game.name}
                        width={200}
                        height={112}
                        className="rounded-md object-cover"
                    />
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">{game.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                Release: {game.releaseDate}
                            </p>
                        </div>
                        <p className="mt-2 font-medium text-green-400">
                            {game.price ? `$${game.price}` : "Free / TBA"}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    )
}
