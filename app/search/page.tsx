import Results from "@/components/search page/Results";
import Layout from "@/components/layout/Layout";
import {fetchGames} from "@/lib";

export default async function SearchPage({searchParams}: {searchParams: Promise<{query?: string}>}) {
    const query = (await searchParams).query ?? "";
    const games = await fetchGames();

    return (
        <Layout>
            <Results query={query} games={games}/>
        </Layout>
    )
}
