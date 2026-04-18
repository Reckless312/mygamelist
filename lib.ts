import { routes } from '@/lib/apiRequest'

export async function fetchGames(): Promise<Game[]> {
    try {
        const response = await fetch(routes.games.all)

        if (!response.ok) {
            return []
        }

        return response.json()
    } catch {
        return []
    }
}

export async function fetchGame(id: string): Promise<Game | null> {
    try {
        const response = await fetch(routes.games.one(id))

        if (!response.ok) {
            return null
        }

        return response.json()
    } catch {
        return null
    }
}

export async function fetchGamesFromYear(year: string): Promise<Game[]> {
    try {
        const response = await fetch(routes.games.byYear(year))

        if (!response.ok) {
            return []
        }

        return response.json()
    } catch {
        return []
    }
}

export async function fetchUserList(): Promise<ListItem[]> {
    try {
        const response = await fetch(routes.list.all, { credentials: 'include' })

        if (!response.ok) {
            return []
        }

        return response.json()
    } catch {
        return []
    }
}

export async function addItemToList(gameId: string): Promise<boolean> {
    try {
        const response = await fetch(routes.list.all, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId }),
            credentials: 'include',
        })

        return response.ok
    } catch {
        return false
    }
}

export async function removeItemFromList(gameId: string): Promise<boolean> {
    try {
        const response = await fetch(routes.list.one(gameId), {
            method: 'DELETE',
            credentials: 'include',
        })

        return response.ok
    } catch {
        return false
    }
}

export async function updateListItem(gameId: string, patch: { status?: string; score?: number }): Promise<boolean> {
    try {
        const response = await fetch(routes.list.one(gameId), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patch),
            credentials: 'include',
        })

        return response.ok
    } catch {
        return false
    }
}

export async function getListItem(gameId: string): Promise<ListItem | null> {
    try {
        const response = await fetch(routes.list.one(gameId), { credentials: 'include' })

        if (!response.ok) {
            return null
        }

        const data = await response.json()

        if (!data.isInList) {
            return null
        }

        return { game: data.game, status: data.status, score: data.score }
    } catch {
        return null
    }
}

export type Images = {
    image_url: string;
}

export type Game = {
    id: number;
    name: string;
    description: string;
    banner_url: string;
    releaseDate: string;
    price: number;
    Game_Images: Images[];
    tags: string[];
}

export type ListItem = {
    game: Game;
    status: string;
    score: number;
}

export const statusFilters = [
    { key: 'all', label: 'All Games' },
    { key: 'Currently Playing', label: 'Currently Playing' },
    { key: 'Completed', label: 'Completed' },
    { key: 'On Hold', label: 'On Hold' },
    { key: 'Dropped', label: 'Dropped' },
    { key: 'Plan To Play', label: 'Plan to Play' },
]
