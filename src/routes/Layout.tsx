import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
      <Footer />
    </>
  );
};

export default Layout;
