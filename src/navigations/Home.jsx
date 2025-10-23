import Slider from "../components/home/Slider";
import LatestItems from "../components/home/LatestItems";
import OurMission from "../components/home/OurMission";
import AboutOurStats from "../components/home/AboutOurStats";
import Newsletter from "../components/home/Newsletter";

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
