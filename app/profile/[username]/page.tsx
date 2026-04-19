import Image from "next/image"
import { notFound } from "next/navigation"
import { fetchPublicUserList, statusFilters } from "@/lib"
import type { ListItem } from "@/lib"
import Layout from "@/components/layout/Layout"

type Props = {
    params: Promise<{ username: string }>
}

const STATUS_KEYS = statusFilters
    .filter((s) => s.key !== "all")
    .map((s) => s.key)

function computeStats(list: ListItem[]) {
    return STATUS_KEYS.map((status) => {
        const items = list.filter((item) => item.status === status)
        const scored = items.filter((item) => item.score > 0)
        const avgScore =
            scored.length > 0
                ? (scored.reduce((sum, item) => sum + item.score, 0) / scored.length).toFixed(1)
                : null
        return { status, count: items.length, avgScore }
    })
}

export default async function ProfilePage({ params }: Props) {
    const { username } = await params
    const list = await fetchPublicUserList(username)

    if (list === null) {
        notFound()
    }

    const stats = computeStats(list)
    const totalGames = list.length

    return (
        <Layout>
            <div className="flex items-center px-16 py-12 gap-16 text-white font-mono">
                <div className="flex flex-col items-start gap-3 shrink-0">
                    <h1 className="text-2xl font-bold">{username}</h1>
                    <Image
                        src="/profile.png"
                        alt="profile"
                        width={288}
                        height={288}
                    />
                    <p className="text-gray-400 text-sm">{totalGames} game{totalGames !== 1 ? "s" : ""} in list</p>
                </div>

                <div className="flex flex-col gap-2">
                    <table className="w-full text-sm">
                        <thead className="text-gray-400 border-b border-gray-700">
                            <tr>
                                <th className="text-left py-2 pr-12">Status</th>
                                <th className="text-center py-2 pr-8">Games</th>
                                <th className="text-center py-2">Avg Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map(({ status, count, avgScore }) => (
                                <tr key={status} className="border-b border-gray-800">
                                    <td className="py-2 pr-12">{status}</td>
                                    <td className="text-center py-2 pr-8">{count}</td>
                                    <td className="text-center py-2">
                                        {avgScore ?? <span className="text-gray-500">—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
