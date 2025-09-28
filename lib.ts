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

export async function checkItemInList(username: string, gameId: string) : Promise<boolean | null> {
    if (!process.env.NEXT_PUBLIC_API_CHECK_ITEM_IN_LIST) {
        return null;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_CHECK_ITEM_IN_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            gameId: gameId
        })
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return data.isInList;
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
    { key: "currently-playing", label: "Currently Playing" },
    { key: "completed", label: "Completed" },
    { key: "on-hold", label: "On Hold" },
    { key: "dropped", label: "Dropped" },
    { key: "plan-to-play", label: "Plan to Play" },
];