'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthentication } from '@/components/AuthenticationContext'

export default function AddGameFAB() {
    const { role, isServerDown } = useAuthentication()

    if (role !== 'admin' || isServerDown) {
        return null
    }

    return (
        <Link href="/game/new" className="fixed bottom-6 right-6 z-50">
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-500 cursor-pointer">
                <Plus className="h-6 w-6" />
            </Button>
        </Link>
    )
}
