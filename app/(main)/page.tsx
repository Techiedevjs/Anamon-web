import HeroCard from "../components/HeroCard";
import RecentPullsHeader from "../components/RecentPullsHeader";
import RecentPullsCarousel from "../components/RecentPullsCarousel";
import WelcomeSection from "../components/WelcomeSection";
import TopAnamons from "../components/TopAnamons";
import CollectorLeaderboard from "../components/CollectorLeaderboard";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Hero Card Section */}
      <section className="mb-8 sm:mb-10 lg:mb-12 xl:mb-14">
        <HeroCard />
      </section>

      {/* Recent Pulls Section */}
      <section className="mb-8 sm:mb-10 lg:mb-12 xl:mb-14">
        <RecentPullsHeader />
        <div className="mt-6 lg:mt-8">
          <RecentPullsCarousel />
        </div>
      </section>

      {/* Top Anamons Section */}
      <section className="mb-8 sm:mb-10 lg:mb-12 xl:mb-14">
        <TopAnamons />
      </section>

      {/* Collector Leaderboard Section */}
      <section className="mb-8 sm:mb-10 lg:mb-12 xl:mb-14">
        <CollectorLeaderboard />
      </section>
    </div>
  );
}
