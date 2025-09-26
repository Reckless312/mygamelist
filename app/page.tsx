import Layout from "@/components/layout/Layout";
import {fetchGamesFromYear} from "@/lib";
import {Showcase} from "@/components/main page/Showcase";

export default async function Home() {
    const currentYear = new Date().getFullYear().toString();
    const previousYear = (parseInt(currentYear) - 1).toString();

    const previousYearReleases = await fetchGamesFromYear(previousYear);
    const thisYearReleases = await fetchGamesFromYear(currentYear);

    return (
      <Layout>
          <div>
              {thisYearReleases.length > 2 && (<Showcase games={thisYearReleases} title={`${currentYear} Releases`}/>)}
              {previousYearReleases.length > 2 && (<Showcase games={previousYearReleases} title={`${previousYear} Releases`} />)}
          </div>
      </Layout>
    );
}
