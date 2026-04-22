'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteGame } from '@/lib'
import { toast } from '@/lib/toast'

export default function DeleteGameButton({ gameId, gameName, onDelete }: {
    gameId: number
    gameName: string
    onDelete: (id: number) => void
}) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        const ok = await deleteGame(gameId)
        setLoading(false)

        if (ok) {
            toast.success(`${gameName} deleted`)
            onDelete(gameId)
        } else {
            toast.error('Failed to delete game')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="h-8 w-8 cursor-pointer" disabled={loading}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0F0F14] border border-gray-700 text-white font-mono">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {gameName}?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600 cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 cursor-pointer">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
