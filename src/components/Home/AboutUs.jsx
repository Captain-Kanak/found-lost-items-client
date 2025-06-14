import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">About Our Stats</h1>
      <div className="my-8 grid gap-4 grid-cols-1 lg:grid-cols-3 shadow">
        <div className="border rounded-lg flex gap-2 flex-col py-10 items-center justify-center">
          <p className="font-medium">Total Items Posted</p>
          <h2 className="text-4xl font-bold">
            <CountUp
              start={0}
              end={1253}
              duration={3}
              delay={1.5}
              separator=","
            />
          </h2>
          <p className="font-medium">Lost & Found Records</p>
        </div>

        <div className="border rounded-lg flex gap-2 flex-col py-10 items-center justify-center">
          <p className="font-medium">Total Items Recovered</p>
          <h2 className="text-4xl font-bold">
            <CountUp
              start={0}
              end={972}
              duration={3}
              delay={1.5}
              separator=","
            />
          </h2>
          <p className="font-medium">Recovered Records</p>
        </div>

        <div className="border rounded-lg flex gap-2 flex-col py-10 items-center justify-center">
          <p className="font-medium">Total users</p>
          <h2 className="text-4xl font-bold">
            <CountUp
              start={0}
              end={6291}
              duration={3}
              delay={1.5}
              separator=","
            />
          </h2>
          <p className="font-medium">Users Records</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
