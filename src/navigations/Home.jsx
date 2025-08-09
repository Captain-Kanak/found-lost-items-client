import React from "react";
import Slider from "../components/Home/Slider";
import LateastItems from "../components/Home/LateastItems";
import OurMission from "../components/Home/OurMission";
import AboutOurStats from "../components/Home/AboutOurStats";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div>
      <Slider />
      <LateastItems />
      <OurMission />
      <AboutOurStats />
      <Newsletter />
    </div>
  );
};

export default Home;
