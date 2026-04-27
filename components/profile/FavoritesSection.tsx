'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/lib'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function FavoritesSection({ favorites }: { favorites: Game[] }) {
    if (favorites.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col justify-start gap-3 flex-1 min-w-0">
            <h2 className="text-sm text-gray-400 font-mono py-2">Favorites</h2>
            <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="-ml-2">
                    {favorites.map((game) => (
                        <CarouselItem key={game.id} className="pl-2 basis-1/3">
                            <Link href={`/game/${game.id}`}>
                                <div className="relative overflow-hidden rounded-lg border border-gray-700/50 hover:border-gray-500 transition-colors w-full h-[180px]">
                                    <Image
                                        src={game.banner_url}
                                        alt={game.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {favorites.length > 3 && (
                    <>
                        <CarouselPrevious className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 -left-4" />
                        <CarouselNext className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 -right-4" />
                    </>
                )}
            </Carousel>
        </div>
    )
}
