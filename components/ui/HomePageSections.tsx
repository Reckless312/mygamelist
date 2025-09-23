'use client';

import {useGames} from "@/components/GamesContext";
import HomePageContentBox from "@/components/HomePageContentBox";

export default function HomePageSections() {
    const {games} = useGames() || {};

    if (games === undefined || games.length === 0) {
        return;
    }

    console.log(games);
    return (
        <div>
            <HomePageContentBox spanContent={"Upcoming Releases"}
                                leftImage={games[0].banner_url}
                                centerImage={"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1741697885'"}
                                rightImage={"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1741697885'"}/>
            <HomePageContentBox spanContent={"Upcoming Releases"}
                                leftImage={"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1741697885'"}
                                centerImage={"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1741697885'"}
                                rightImage={"https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1741697885'"}/>
        </div>
    );
}