import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router-dom";
const RootLayout: React.FC = () => {
  return (
    <div className="pt-6 bg-fixed bg-cover bg-center bg-[url('src/assets/header/sky.jpg')]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
