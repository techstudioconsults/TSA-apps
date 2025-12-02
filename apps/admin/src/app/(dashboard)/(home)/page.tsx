import Cards from "./_views/Cards";
import Hero from "./_views/Hero";
import RecentTable from "./_views/RecentTable";

const Home = () => {
  return (
    <main>
      <Hero />
      <Cards />
      <RecentTable />
    </main>
  );
};

export default Home;
