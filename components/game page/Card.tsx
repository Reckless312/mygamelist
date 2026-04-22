import Showcase from "@/components/game page/Showcase";
import Image from "next/image";
import {Game} from "@/lib";
import ListManageOptions from "@/components/game page/ListManageOptions";
import { Badge } from "@/components/ui/badge";

export default function Card({game}: {game: Game}) {
    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
            <div className="max-w-5xl mx-auto px-4 py-3">
                <h1 className="text-2xl md:text-3xl font-mono mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {game.name}
                </h1>

                <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                    <div className="lg:w-[55%] flex flex-col">
                        <div className="flex">
                            <Showcase images={game.Game_Images}/>
                        </div>
                        <ListManageOptions game={game}/>
                    </div>

                    <div className="lg:w-[42%] flex flex-col">
                        <div className="mb-3">
                            <div className="relative overflow-hidden rounded-lg border border-gray-700 shadow-xl">
                                <Image src={game.banner_url} alt={"game-banner"} quality={100} width={320} height={160} className="w-full h-auto object-cover"/>
                            </div>
                        </div>

                        <div className="flex-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl flex flex-col">
                            <div className="flex-1 space-y-3">
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="flex-1"></div>

                                <div className="border-t border-gray-700 pt-3 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm font-mono">Release Date:</span>
                                        <span className="text-white text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                                            {game.releaseDate}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm font-mono">Price:</span>
                                        <span className="text-white text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
                                            {game.price}$
                                        </span>
                                    </div>

                                    {game.Game_Tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {game.Game_Tags.map(({ id, tag }) => (
                                                <Badge key={id} className="font-mono bg-[#2F25B1]/40 text-white border border-[#2F25B1] hover:bg-[#2F25B1]/60">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}