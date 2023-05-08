import Header from "./components/Header";
import Footer from "./components/Footer";
import { people } from "./people.json";
import Filters from "./components/Filter";
import Deck from "./Pages/Deck.tsx";

const Home: React.FC = () => {
  return (
    <div className="pt-6 bg-fixed bg-cover bg-center bg-[url('src/assets/header/sky.jpg')]">
      <Header />
      <Filters />
      <Deck people={people} />
      <Footer />
    </div>
  );
};

export default Home;
