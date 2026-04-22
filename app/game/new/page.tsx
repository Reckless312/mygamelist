import GameForm from '@/components/game/GameForm'
import Layout from '@/components/layout/Layout'

export default function NewGamePage() {
    return (
        <Layout>
            <GameForm mode="create" />
        </Layout>
    )
}
