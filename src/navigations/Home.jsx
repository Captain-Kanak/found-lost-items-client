import React from "react";
import Slider from "../components/Home/Slider";
import LateastItems from "../components/Home/LateastItems";
import AboutUs from "../components/Home/AboutUs";
import OurMission from "../components/Home/OurMission";

const Home = () => {
  return (
    <div>
      <Slider />
      <LateastItems />
      <OurMission />
      <AboutUs />
    </div>
  );
};

export default Home;
