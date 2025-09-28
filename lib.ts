export async function fetchGames() : Promise<Game[]> {
    if (!process.env.API_ALL_GAMES) {
        return [];
    }

    const response = await fetch(process.env.API_ALL_GAMES)

    if (!response.ok) {
        return [];
    }

    return await response.json();
}

export async function fetchGame(id: string) : Promise<Game | null> {
    if (!process.env.API_ONE_GAME) {
        return null;
    }

    const response = await fetch(process.env.API_ONE_GAME, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
}

export async function fetchGamesFromYear(year: string) : Promise<Game[]> {
    if (!process.env.API_GAMES_BY_YEAR) {
        return [];
    }

    const response = await fetch(process.env.API_GAMES_BY_YEAR, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            year: year
        })
    });

    if (!response.ok) {
        return [];
    }

    return await response.json();
}

export async function fetchUserList(username: string) : Promise<ListItem[]> {
    if (!process.env.NEXT_PUBLIC_API_USER_LIST) {
        return [];
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_USER_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
    });

    if (!response.ok) {
        return [];
    }

    return await response.json();
}

export async function addItemToList(username: string, gameId: string) : Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_API_ADD_ITEM_TO_LIST) {
        return false;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_ADD_ITEM_TO_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId
        })
    });

    return response.ok;
}

export async function removeItemFromList(username: string, gameId: string) : Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_API_REMOVE_ITEM_FROM_LIST) {
        return false;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_REMOVE_ITEM_FROM_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId
        })
    });

    return response.ok;
}

export async function updateStatusFromItem(username: string, gameId: string, status: string) : Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_API_UPDATE_STATUS_FROM_ITEM) {
        return false;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_UPDATE_STATUS_FROM_ITEM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId,
            status: status
        })
    })

    return response.ok;
}

export async function updateScoreFromItem(username: string, gameId: string, score: number) : Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_API_UPDATE_SCORE_FROM_ITEM) {
        return false;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_UPDATE_SCORE_FROM_ITEM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId,
            score: score
        })
    })

    return response.ok;
}

export async function getListItem(username: string, gameId: string) : Promise<ListItem | null> {
    if (!process.env.NEXT_PUBLIC_API_GET_LIST_ITEM) {
        return null;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_GET_LIST_ITEM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId
        })
    })

    if (!response.ok) {
        return null;
    }

    return await response.json();
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
    { key: "all", label: "All Games" },
    { key: "Currently Playing", label: "Currently Playing" },
    { key: "Completed", label: "Completed" },
    { key: "On Hold", label: "On Hold" },
    { key: "Dropped", label: "Dropped" },
    { key: "Plan To Play", label: "Plan to Play" },
];