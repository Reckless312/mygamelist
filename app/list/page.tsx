'use client'
import React, { useState } from 'react';

const mockGames = [
    { id: 1, title: "Elden Ring", score: 9.5, developer: "FromSoftware", status: "completed" },
    { id: 2, title: "The Witcher 3: Wild Hunt", score: 9.2, developer: "CD Projekt Red", status: "completed" },
    { id: 3, title: "Cyberpunk 2077", score: 8.1, developer: "CD Projekt Red", status: "currently-playing" },
    { id: 4, title: "Baldur's Gate 3", score: 9.8, developer: "Larian Studios", status: "plan-to-play" },
    { id: 5, title: "Hades", score: 9.0, developer: "Supergiant Games", status: "completed" },
    { id: 6, title: "Hollow Knight", score: 8.9, developer: "Team Cherry", status: "on-hold" },
    { id: 7, title: "Mass Effect Legendary Edition", score: 8.7, developer: "BioWare", status: "dropped" },
    { id: 8, title: "Sekiro: Shadows Die Twice", score: 9.1, developer: "FromSoftware", status: "completed" },


];

const statusFilters = [
    { key: "all", label: "All Games" },
    { key: "currently-playing", label: "Currently Playing" },
    { key: "completed", label: "Completed" },
    { key: "on-hold", label: "On Hold" },
    { key: "dropped", label: "Dropped" },
    { key: "plan-to-play", label: "Plan to Play" },
];

export default function ListPage() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredGames = activeFilter === "all" ? mockGames : mockGames.filter(game => game.status === activeFilter);

    return (
        <div className="min-h-screen w-full flex flex-col relative">
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: "url(/list-background.png)" }}/>
            <main className="flex justify-end flex-1 p-8">
                <div className="w-full max-w-6xl bg-black/70 backdrop-blur-sm rounded-2xl border border-orange-900/30 text-gray-200 mr-12 overflow-hidden">
                    <div className="flex justify-between gap-1 border-b border-gray-600/50 p-6 pb-0">
                        {statusFilters.map((filter) => (
                            <button key={filter.key} onClick={() => setActiveFilter(filter.key)}
                                    className={`pb-3 px-4 text-sm font-mono transition-all duration-200 border-b-2 ${activeFilter === filter.key
                                        ? "text-orange-400 border-orange-400" : "text-gray-400 border-transparent hover:text-orange-300 hover:border-orange-300/50"}`}>
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-700/50">
                                <th className="text-left p-4 text-sm font-mono text-orange-400 w-16">#</th>
                                <th className="text-left p-4 text-sm font-mono text-orange-400">Game Title</th>
                                <th className="text-left p-4 text-sm font-mono text-orange-400 w-20">Score</th>
                                <th className="text-left p-4 text-sm font-mono text-orange-400">Developer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredGames.map((game, index) => (
                                <tr key={game.id} className="border-b border-gray-800/30 hover:bg-orange-900/10 transition-colors duration-200 group">
                                    <td className="p-4 text-sm font-mono text-gray-400 group-hover:text-orange-400 transition-colors">
                                        {index + 1}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-mono text-gray-100 group-hover:text-white transition-colors">
                                            {game.title}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`font-mono text-lg text-red-400`}>
                                            {game.score}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                                        {game.developer}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}