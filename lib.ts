export async function fetchGames() : Promise<Game[]> {
    const response = await fetch("http://localhost:8080/api/games")

    if (!response.ok) {
        return [];
    }

    return await response.json();
}

export async function fetchGame(id: string) : Promise<Game | null> {
    const response = await fetch(`http://localhost:8080/api/games/filter/id`, {
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
    const response = await fetch(`http://localhost:8080/api/games/filter/year`, {
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