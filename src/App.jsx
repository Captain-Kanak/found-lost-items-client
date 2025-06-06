import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 lg:px-16">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
