const BASE = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:8080'

export const routes = {
    games: {
        all: `${BASE}/api/games`,
        one: (id: string | number) => `${BASE}/api/games/${id}`,
        byYear: (year: string | number) => `${BASE}/api/games?startYear=${year}&endYear=${year}`,
    },
    auth: {
        login: `${BASE}/api/login`,
        register: `${BASE}/api/register`,
        logout: `${BASE}/api/logout`,
        hq: `${BASE}/api/hq`,
        loginSteam: `${BASE}/api/login/steam`,
        steamProfile: `/api/steam/profile`,
    },
    list: {
        all: `${BASE}/api/list`,
        one: (gameId: string | number) => `${BASE}/api/list/${gameId}`,
    },
    favorites: {
        all: `${BASE}/api/favorites`,
        one: (gameId: string | number) => `${BASE}/api/favorites/${gameId}`,
    },
    users: {
        list: (username: string) => `${BASE}/api/users/${username}/list`,
        favorites: (username: string) => `${BASE}/api/users/${username}/favorites`,
    },
}
