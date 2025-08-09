import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
