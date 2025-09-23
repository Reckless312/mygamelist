'use client';

import {useGames} from "@/components/GamesContext";
import {HomePageContentBox} from "@/components/HomePageContentBox";

export default function HomePageSections() {
    const {games} = useGames() || {};

    if (games === undefined || games.length === 0) {
        return;
    }

    const currentYear = new Date().getFullYear().toString();
    const previousYear = (parseInt(currentYear) - 1).toString();

    const previousYearReleases = games.filter(game => game.releaseDate.slice(0, 4) === previousYear);
    const thisYearReleases = games.filter(game => game.releaseDate.slice(0, 4) === currentYear);

    return (
        <div>
            {thisYearReleases.length > 2 && (<HomePageContentBox games={thisYearReleases} title={`${currentYear} Releases`}/>)}
            {previousYearReleases.length -1 && (<HomePageContentBox games={previousYearReleases} title={`${previousYear} Releases`} />)}
        </div>
    );
}