import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/navigation/Navigation";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
