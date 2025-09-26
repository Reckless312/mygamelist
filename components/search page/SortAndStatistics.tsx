import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

export default function SortAndStatistics({length, query, onSortChange, currentSortOption}: {length: number, query: string,
    onSortChange: (sort: "name-asc" | "name-desc" | "newest" | "oldest") => void, currentSortOption: "name-asc" | "name-desc" | "newest" | "oldest"}) {
    return (
        <div className="mb-4 pb-2 border-b border-gray-700 flex justify-between items-center">
            {query !== '' && (
                <h2 className="text-lg font-mono text-white">
                    <span className="text-[#2F25B1] font-semibold">{length}</span>
                    <span className="text-white">{length === 1 ?' game' : ' search'} found for &quot;</span>
                    <span className="text-gray-400">{query}</span>&quot;
                </h2>
            )}

            {/*Justify between related*/}
            <div></div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-[#0F0F14] border border-gray-700 text-white flex items-center gap-2">
                        Sort By <ChevronDown className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"start"} className="bg-[#0F0F14] border border-gray-700 text-white">
                    <DropdownMenuItem onClick={() => onSortChange("name-asc")} className={currentSortOption === "name-asc" ? "bg-gray-700" : ""}>
                        Name (A–Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSortChange("name-desc")} className={currentSortOption === "name-desc" ? "bg-gray-700" : ""}>
                        Name (Z–A)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSortChange("newest")} className={currentSortOption === "newest" ? "bg-gray-700" : ""}>
                        Release Date (Newest)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSortChange("oldest")} className={currentSortOption === "oldest" ? "bg-gray-700" : ""}>
                        Release Date (Oldest)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}