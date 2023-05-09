import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./RootLayout";
import Page from "./Pages/Page";
import Deck from "./Pages/Deck";
import { loader } from "./components/Loader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Deck />} loader={loader} />
      <Route path="/about" element={<Page />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
