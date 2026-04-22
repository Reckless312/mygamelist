'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthentication } from '@/components/AuthenticationContext'

export default function AddGameFAB() {
    const { isAuthenticated, isServerDown } = useAuthentication()

    if (!isAuthenticated || isServerDown) {
        return null
    }

    return (
        <Link href="/game/new" className="fixed bottom-6 right-6 z-50">
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-[#2F25B1] hover:bg-[#3D32CC] cursor-pointer">
                <Plus className="h-6 w-6" />
            </Button>
        </Link>
    )
}
