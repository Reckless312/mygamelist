'use client'

import React, {useState} from "react";
import {useGames} from "@/components/GamesContext";

const statusFilters = [
    { key: "all", label: "All Games" },
    { key: "currently-playing", label: "Currently Playing" },
    { key: "completed", label: "Completed" },
    { key: "on-hold", label: "On Hold" },
    { key: "dropped", label: "Dropped" },
    { key: "plan-to-play", label: "Plan to Play" },
];

export default function GameList() {
    const [activeFilter, setActiveFilter] = useState("all");
    const {games} = useGames() || {};

    return (<div className="w-full max-w-6xl bg-black/60 backdrop-blur-sm rounded-2xl border border-[#2F3A67]/30 text-gray-200 mr-12 overflow-hidden">
        <div className="flex justify-between gap-1 border-b border-gray-600/50 p-6 pb-0">
            {statusFilters.map((filter) => (
                <button key={filter.key} onClick={() => setActiveFilter(filter.key)}
                        className={`pb-3 px-4 text-sm font-mono transition-all duration-200 border-b-2 ${activeFilter === filter.key
                            ? "text-[#4A5D8A] border-[#4A5D8A]" : "text-gray-400 border-transparent hover:text-[#8B9DC3] hover:border-[#2F3A67]/50"}`}>
                    {filter.label}
                </button>
            ))}
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="border-b border-gray-700/50">
                    <th className="text-left p-4 text-sm font-mono text-[#4A5D8A] w-16">#</th>
                    <th className="text-left p-4 text-sm font-mono text-[#4A5D8A]">Game Title</th>
                    <th className="text-left p-4 text-sm font-mono text-[#4A5D8A] w-20">Score</th>
                    <th className="text-left p-4 text-sm font-mono text-[#4A5D8A]">Developer</th>
                </tr>
                </thead>
                <tbody>
                {/*{games.map((game, index) => (*/}
                {/*    <tr key={game.id} className="border-b border-gray-800/30 hover:bg-[#2F3A67]/10 transition-colors duration-200 group">*/}
                {/*        <td className="p-4 text-sm font-mono text-gray-400 group-hover:text-[#4A5D8A] transition-colors">*/}
                {/*            {index + 1}*/}
                {/*        </td>*/}
                {/*        <td className="p-4">*/}
                {/*            <div className="font-mono text-gray-100 group-hover:text-white transition-colors">*/}
                {/*                {game.title}*/}
                {/*            </div>*/}
                {/*        </td>*/}
                {/*        <td className="p-4">*/}
                {/*                        <span className={`font-mono text-lg text-[#8B9DC3]`}>*/}
                {/*                            {game.score}*/}
                {/*                        </span>*/}
                {/*        </td>*/}
                {/*        <td className="p-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">*/}
                {/*            {game.developer}*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                </tbody>
            </table>
        </div>
    </div>)
}