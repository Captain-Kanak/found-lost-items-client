import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-5 lg:px-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
