"use client";

import Cards from "./_views/Cards";
import Hero from "./_views/Hero";
import RecentTable from "./_views/RecentTable";

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <Cards />
      <RecentTable />
    </main>
  );
};

export default Home;
