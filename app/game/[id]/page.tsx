import {fetchGame} from "@/lib";
import Layout from "@/components/layout/Layout";
import Card from "@/components/game page/Card";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function GamePage({params}: PageProps) {
    const {id} = await params;

    if (id === undefined) {
        return null;
    }

    const game = await fetchGame(id);

    if (!game) {
        return (
            <div className="flex flex-col items-center justify-center h-128">
                <h1 className={"text-3xl"}>404 - Not Found</h1>
            </div>
        )
    }

    return (
        <Layout>
            <Card game={game}/>
        </Layout>
    );
}