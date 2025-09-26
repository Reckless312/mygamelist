import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import Link from "next/link";
import {Game} from "@/lib";

export function Showcase({games, title}: Props) {
    return (
        <div className="flex flex-col mt-6 px-4 sm:px-16 py-6">
            <span className="text-center md:text-start font-mono text-xl mb-4">{title}</span>
            <Carousel className="w-full">
                <CarouselContent className="-ml-6">
                    {games.map((game, index) => (
                        <CarouselItem key={index} className="pl-6 basis-2/3 sm:basis-2/5 md:basis-1/6">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                                <Link href={`/game/${game.id}`}>
                                    <Image src={game.banner_url} alt={`${game.name || 'Game'} banner`} fill quality={100} priority={index === 0}
                                           className="object-cover hover:scale-105 transition-transform duration-300"/>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-black"/>
                <CarouselNext className="right-2 bg-black"/>
            </Carousel>
        </div>
    )
}

type Props = {
    games: Game[];
    title: string;
};