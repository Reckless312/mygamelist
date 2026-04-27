'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthentication } from '@/components/AuthenticationContext'
import { getFavoriteStatus, addFavorite, removeFavorite } from '@/lib'
import { toast } from '@/lib/toast'

export default function FavoriteButton({ gameId }: { gameId: number }) {
    const [favorited, setFavorited] = useState<boolean | undefined>(undefined)
    const { isAuthenticated } = useAuthentication() || {}

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        getFavoriteStatus(gameId.toString()).then(setFavorited)
    }, [isAuthenticated, gameId])

    if (!isAuthenticated || favorited === undefined) {
        return null
    }

    const handleToggle = async () => {
        if (favorited) {
            const ok = await removeFavorite(gameId.toString())

            if (ok) {
                setFavorited(false)
                toast.success('Removed from favorites')
            } else {
                toast.error('Failed to remove from favorites')
            }
        } else {
            const ok = await addFavorite(gameId.toString())

            if (ok) {
                setFavorited(true)
                toast.success('Added to favorites')
            } else {
                toast.error('Failed to add to favorites')
            }
        }
    }

    return (
        <button onClick={handleToggle} className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
            <Heart className={`w-6 h-6 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
        </button>
    )
}
