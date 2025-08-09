import CountUp from "react-countup";
import { FaBoxOpen, FaCheckCircle, FaUsers } from "react-icons/fa";

const AboutOurStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Items Posted",
      count: 1253,
      subtitle: "Lost & Found Records",
      icon: <FaBoxOpen className="text-blue-500 text-5xl mb-4" />,
      colorClass: "from-blue-50 to-blue-100 border-blue-200 text-blue-900",
    },
    {
      id: 2,
      title: "Total Items Recovered",
      count: 972,
      subtitle: "Recovered Records",
      icon: <FaCheckCircle className="text-green-500 text-5xl mb-4" />,
      colorClass: "from-green-50 to-green-100 border-green-200 text-green-900",
    },
    {
      id: 3,
      title: "Total Users",
      count: 6291,
      subtitle: "Users Records",
      icon: <FaUsers className="text-purple-500 text-5xl mb-4" />,
      colorClass:
        "from-purple-50 to-purple-100 border-purple-200 text-purple-900",
    },
  ];

  return (
    <div className="py-10">
      <h1 className="text-3xl font-extrabold text-center mb-10">Our Stats</h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {stats.map(({ id, title, count, subtitle, icon, colorClass }) => (
          <div
            key={id}
            className={`bg-gradient-to-tr ${colorClass} border rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300`}
          >
            {icon}
            <p className="font-semibold text-lg mb-2">{title}</p>
            <h2 className="text-5xl font-extrabold mb-2">
              <CountUp
                start={0}
                end={count}
                duration={3}
                delay={1.5}
                separator=","
              />
            </h2>
            <p className="font-medium">{subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutOurStats;
