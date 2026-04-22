'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import SortAndStatistics from "@/components/search page/SortAndStatistics"
import Pagination from "@/components/search page/Pagination"
import Link from "next/link"
import { Game } from "@/lib"
import { useAuthentication } from "@/components/AuthenticationContext"
import DeleteGameButton from "@/components/search page/DeleteGameButton"
import AddGameFAB from "@/components/search page/AddGameFAB"
import { Pencil } from "lucide-react"

export default function Results({ query, games }: { query: string, games: Game[] }) {
    const [localGames, setLocalGames] = useState<Game[]>(games)
    const { isAuthenticated } = useAuthentication()

    const foundGames = useMemo(() => {
        return localGames?.filter((game) => game.name.toLowerCase().includes(query.toLowerCase())) || []
    }, [localGames, query])

    const [sortOption, setSortOption] = useState<"name-asc" | "name-desc" | "newest" | "oldest">("name-asc")

    useEffect(() => {
        const form = document.querySelector(".search-form") as HTMLFormElement | null

        if (form) {
            form.reset()
        }
    }, [query])

    const sortedGames = useMemo(() => {
        const copyOfFoundGames = [...foundGames]
        if (sortOption === "name-asc") {
            return copyOfFoundGames.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortOption === "name-desc") {
            return copyOfFoundGames.sort((a, b) => b.name.localeCompare(a.name))
        } else if (sortOption === "newest") {
            return copyOfFoundGames.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
        } else if (sortOption === "oldest") {
            return copyOfFoundGames.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
        }
        return copyOfFoundGames
    }, [foundGames, sortOption])

    const handleDelete = (id: number) => {
        setLocalGames(prev => prev.filter(g => g.id !== id))
    }

    if (!localGames || localGames.length === 0) {
        return null
    }

    return (
        <>
            <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
                <SortAndStatistics length={foundGames.length} query={query} onSortChange={setSortOption} currentSortOption={sortOption}/>
                <Pagination games={sortedGames} query={query} renderGameAction={(game) => (
                    <Card key={game.id} className="flex flex-row gap-4 p-4 shadow-sm bg-[#0F0F14] border-0 text-white items-center">
                        <Link href={`/game/${game.id}`} className="flex gap-4 items-center min-w-0 flex-1">
                            <Image src={game.banner_url} quality={100} alt={game.name} width={140} height={60} className="rounded-md object-cover shrink-0"/>
                            <div className="flex flex-col min-w-0">
                                <h2 className="text-lg font-mono truncate">{game.name}</h2>
                                <p className="text-sm text-muted-foreground">Release: {game.releaseDate}</p>
                            </div>
                        </Link>
                        {isAuthenticated && (
                            <div className="flex gap-2 items-center shrink-0 ml-auto">
                                <Link href={`/game/${game.id}/edit`}>
                                    <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer border-gray-600 bg-transparent hover:bg-gray-700 text-white hover:text-white">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <DeleteGameButton gameId={game.id} gameName={game.name} onDelete={handleDelete} />
                            </div>
                        )}
                    </Card>
                )}/>
            </div>
            <AddGameFAB />
        </>
    )
}
