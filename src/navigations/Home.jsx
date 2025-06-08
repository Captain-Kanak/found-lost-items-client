import React from "react";
import Slider from "../components/Home/Slider";
import LateastItems from "../components/Home/LateastItems";
import AboutUs from "../components/Home/AboutUs";

const Home = () => {
  return (
    <div>
      <Slider />
      <LateastItems />
      <AboutUs />
    </div>
  );
};

export default Home;
