'use client'

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useCallback, useEffect, useState} from "react";
import {useAuthentication} from "@/components/AuthenticationContext";
import {Game, getListItem, ListItem, addItemToList, removeItemFromList, updateListItem} from "@/lib";
import {ChevronDown, Plus, Star, Trash2} from "lucide-react";
import {toast} from "@/lib/toast";

const STATUS_OPTIONS = ['Currently Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'];

const SCORE_OPTIONS = Array.from({length: 11}, (_, i) => i);

export default function ListManageOptions({game}: {game: Game}) {
    const [listItem, setListItem] = useState<ListItem | null | undefined>(undefined);
    const {username} = useAuthentication() || {};

    const refreshListData = useCallback(async () => {
        if (!username) {
            return;
        }

        const itemResult = await getListItem(game.id.toString());

        setListItem(itemResult);
    }, [username, game.id]);

    const handleAddToList = async () => {
        const ok = await addItemToList(game.id.toString());

        if (ok) {
            toast.success("Added to list");
        } else {
            toast.error("Failed to add to list");
        }

        await refreshListData();
    };

    useEffect(() => {
        refreshListData().then();
    }, [refreshListData]);

    const handleStatusChange = async (newStatus: string) => {
        const ok = await updateListItem(game.id.toString(), { status: newStatus });

        if (ok) {
            toast.success(`Status set to ${newStatus}`);
        } else {
            toast.error("Failed to update status");
        }

        await refreshListData();
    };

    const handleScoreChange = async (newScore: number) => {
        const ok = await updateListItem(game.id.toString(), { score: newScore });

        if (ok) {
            toast.success(newScore === 0 ? "Score cleared" : `Score set to ${newScore}/10`);
        } else {
            toast.error("Failed to update score");
        }

        await refreshListData();
    };

    const handleRemoveFromList = async () => {
        const ok = await removeItemFromList(game.id.toString());

        if (ok) {
            toast.success("Removed from list");
        } else {
            toast.error("Failed to remove from list");
        }

        await refreshListData();
    };

    if (listItem === undefined) {
        return null;
    }

    if (listItem === null) {
        return (
            <div className="mt-4">
                <Button onClick={handleAddToList} className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm h-9 px-4">
                    <Plus className="w-4 h-4 mr-2"/> Add To List
                </Button>
            </div>
        );
    }

    return (
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-lg">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-mono">Status:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-gray-700/50 hover:bg-gray-600/50 text-white
                             hover:text-white border-gray-600 font-mono text-sm h-9 px-3 cursor-pointer">
                                {listItem?.status || 'Select Status'}
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800/95 backdrop-blur-sm border border-gray-600
                         text-white font-mono">
                            {STATUS_OPTIONS.map((status) => (
                                <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}
                                      className={`hover:bg-gray-700 focus:bg-gray-700 cursor-pointer flex items-center
                                       justify-between ${listItem?.status === status ? 'bg-gray-700' : ''}`}>
                                    {status}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-mono">Score:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-gray-700/50 hover:bg-gray-600/50 text-white hover:text-white
                             border-gray-600 font-mono text-sm h-9 px-3 cursor-pointer">
                                {listItem?.score === 0 ? 'Not Rated' : listItem?.score || 'N/A'}
                                <Star className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800/95 backdrop-blur-sm border border-gray-600
                         text-white font-mono max-h-60">
                            {SCORE_OPTIONS.map((score) => (
                                <DropdownMenuItem key={score} onClick={() => handleScoreChange(score)}
                                      className={`hover:bg-gray-700 focus:bg-gray-700 cursor-pointer flex items-center
                                       justify-between ${listItem?.score === score ? 'bg-gray-700' : ''}`}>
                                    {score === 0 ? 'Not Rated' : `${score}/10`}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="pt-2 border-t border-gray-700">
                    <Button onClick={handleRemoveFromList} variant="destructive" className="bg-red-600/80 hover:bg-red-600
                     text-white font-mono text-sm h-9 px-4 w-full cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" /> Remove from List
                    </Button>
                </div>
            </div>
        </div>
    );
}