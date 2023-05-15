import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./RootLayout";
import Docs from "./Pages/Docs";
import About from "./Pages/About";
import Deck from "./Pages/Deck";
import Episode from "./Pages/Episode";
import Character from "./Pages/Charater";
import { loader } from "./components/Loader";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";

const client = createClient({
  url: "http://localhost:3000/",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Deck />} loader={loader} />
      <Route path="/:charId" element={<Character />} loader={loader} />
      <Route path="/s1" element={<Episode />} loader={loader} />
      <Route path="/about" element={<About />} />
      <Route path="/doc" element={<Docs />} />
      <Route path="*" element={<div>No Match</div>} />
    </Route>
  )
);

function App() {
  return (
    <Provider value={client}>
      <RouterProvider router={router} fallbackElement={<p>Loading</p>} />
    </Provider>
  );
}

export default App;
