import ServerDownPoller from '@/components/ServerDownPoller'
import { TriangleAlert } from 'lucide-react'

export default function ServerDownPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F14] text-white font-mono gap-6">
            <TriangleAlert className="w-12 h-12 text-[#C4943A]" />
            <h1 className="text-2xl text-[#C4943A]">Server Unavailable</h1>
            <p className="text-sm text-gray-400">We are trying to reconnect. Please wait.</p>
            <ServerDownPoller />
        </div>
    )
}
