import Layout from "@/components/layout/Layout";
import {fetchGames} from "@/lib";
import {Showcase} from "@/components/main page/Showcase";

export default async function Home() {
    const games = await fetchGames();

    if (games.length == 0) {
        return <Layout><div></div></Layout>
    }

    const currentYear = new Date().getFullYear().toString();
    const previousYear = (parseInt(currentYear) - 1).toString();

    const previousYearReleases = games.filter(game => game.releaseDate.slice(0, 4) === previousYear);
    const thisYearReleases = games.filter(game => game.releaseDate.slice(0, 4) === currentYear);

    return (
      <Layout>
          <div>
              {thisYearReleases.length > 2 && (<Showcase games={thisYearReleases} title={`${currentYear} Releases`}/>)}
              {previousYearReleases.length > 2 && (<Showcase games={previousYearReleases} title={`${previousYear} Releases`} />)}
          </div>
      </Layout>
    );
}
