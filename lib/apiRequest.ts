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
    },
    list: {
        all: `${BASE}/api/list`,
        one: (gameId: string | number) => `${BASE}/api/list/${gameId}`,
    },
}
