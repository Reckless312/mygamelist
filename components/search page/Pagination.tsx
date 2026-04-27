'use client'

import React from "react"
import { useSearchParams } from "next/navigation"
import { Game } from "@/lib"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 5

function buildHref(query: string, page: number) {
    return `/search?query=${encodeURIComponent(query)}&page=${page}`
}

export default function GamePagination({ games, query, renderGameAction }: {
    games: Game[]
    query: string
    renderGameAction: (game: Game) => React.ReactNode
}) {
    const searchParams = useSearchParams()
    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1)
    const totalPages = Math.max(1, Math.ceil(games.length / ITEMS_PER_PAGE))
    const page = Math.min(currentPage, totalPages)

    const pageGames = games.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (page <= 4) {
            return [1, 2, 3, 4, 5, "...", totalPages]
        }

        if (page >= totalPages - 3) {
            return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }

        return [1, "...", page - 1, page, page + 1, "...", totalPages]
    }

    return (
        <>
            {pageGames.map((game) => renderGameAction(game))}

            {totalPages > 1 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={buildHref(query, page - 1)}
                                aria-disabled={page === 1}
                                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((p, i) => (
                            <PaginationItem key={i}>
                                {p === "..." ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href={buildHref(query, p as number)}
                                        isActive={p === page}
                                        className="cursor-pointer"
                                    >
                                        {p}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href={buildHref(query, page + 1)}
                                aria-disabled={page === totalPages}
                                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    )
}
