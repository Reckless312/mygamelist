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