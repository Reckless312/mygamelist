'use client'

import React, {useEffect, useState} from "react";
import {fetchUserList, ListItem, statusFilters} from "@/lib";
import {useAuthentication} from "@/components/AuthenticationContext";

export default function List() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [listItems, setListItems] = useState<ListItem[]>([]);
    const {username} = useAuthentication() || {};

    useEffect(() => {
        fetchUserList(username).then((listItems) => {setListItems(listItems)});
    }, [username]);

    return (
        <div className="w-full max-w-6xl bg-black/60 backdrop-blur-sm rounded-2xl border border-[#2F3A67]/30 mr-12 overflow-hidden">
            <div className="flex justify-between gap-1 border-b border-gray-600/50 p-6 pb-0">
                {statusFilters.map((filter) => (
                    <button key={filter.key} onClick={() => setActiveFilter(filter.key)}
                            className={`pb-3 px-4 text-sm font-mono transition-all duration-200 border-b-2 ${activeFilter === filter.key
                                ? "text-[#4A5D8A] border-[#4A5D8A]" : "text-gray-300 border-transparent hover:text-[#8B9DC3] hover:border-[#2F3A67]/50"}`}>
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
                {listItems.filter((item: ListItem) => item.status == activeFilter).map((item: ListItem, index: number) => (
                    <tr key={item.game.id} className="border-b border-gray-800/30 hover:bg-[#2F3A67]/10 transition-colors duration-200 group">
                        <td className="p-4 text-sm font-mono text-gray-400 group-hover:text-[#4A5D8A] transition-colors">
                            {index + 1}
                        </td>
                        <td className="p-4">
                            <div className="font-mono text-gray-100 group-hover:text-white transition-colors">
                                {item.game.name}
                            </div>
                        </td>
                        <td className="p-4">
                            <span className={`font-mono text-lg text-[#8B9DC3]`}>
                                {item.score}
                            </span>
                        </td>
                        {/*<td className="p-4 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">*/}
                        {/*    {game.developer}*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>)
}