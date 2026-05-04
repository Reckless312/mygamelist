import Layout from "@/components/layout/Layout";
import {fetchGamesFromYear} from "@/lib";
import {Showcase} from "@/components/main page/Showcase";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const previousYearReleases = await fetchGamesFromYear("2024");
    const thisYearReleases = await fetchGamesFromYear("2025");

    return (
      <Layout>
          <div>
              {thisYearReleases.length > 2 && (<Showcase games={thisYearReleases} title="2025 Releases"/>)}
              {previousYearReleases.length > 2 && (<Showcase games={previousYearReleases} title="2024 Releases"/>)}
          </div>
      </Layout>
    );
}
