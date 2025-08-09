import React from "react";
import Slider from "../components/Home/Slider";
import OurMission from "../components/Home/OurMission";
import AboutOurStats from "../components/Home/AboutOurStats";
import Newsletter from "../components/Home/Newsletter";
import LatestItems from "../components/Home/LatestItems";

const Home = () => {
  return (
    <div>
      <Slider />
      <LatestItems />
      <OurMission />
      <AboutOurStats />
      <Newsletter />
    </div>
  );
};

export default Home;
