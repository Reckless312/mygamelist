import SearchedGames from "@/components/SearchedGames";

export default async function GamesPage({searchParams}: {searchParams: Promise<{query?: string}>}) {
    const query = (await searchParams).query ?? "";

    return (
        <SearchedGames query={query}/>
    )
}
