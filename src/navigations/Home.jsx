import Slider from "../components/homeSections/Slider";
import LatestItems from "../components/homeSections/LatestItems";
import OurMission from "../components/homeSections/OurMission";
import AboutOurStats from "../components/homeSections/AboutOurStats";
import Newsletter from "../components/homeSections/Newsletter";

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
