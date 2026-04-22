import { notFound } from 'next/navigation'
import { fetchGame } from '@/lib'
import GameForm from '@/components/game/GameForm'
import Layout from '@/components/layout/Layout'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditGamePage({ params }: PageProps) {
    const { id } = await params
    const game = await fetchGame(id)

    if (!game) {
        notFound()
    }

    return (
        <Layout>
            <GameForm mode="edit" game={game} />
        </Layout>
    )
}
