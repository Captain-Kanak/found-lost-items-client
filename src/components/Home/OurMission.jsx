import React from "react";
import itemsImage from "../../assets/mission/LostFound_2.jpg";
import petsImage from "../../assets/mission/lost-pets.jpg";
import helpImage from "../../assets/mission/help.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurMission = () => {
  return (
    <div className="my-11 max-m-7xl mx-auto">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1/2 grid grid-cols-2">
            <motion.img
              src={itemsImage}
              animate={{ x: [10, 50, 10], y: [10, 20, 10] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="w-[190px] h-[190px] lg:w-[300px] lg:h-[300px] rounded-lg shadow-2xl"
            />
            <motion.img
              src={petsImage}
              animate={{ x: [10, -90, 10], y: [10, 70, 10] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="w-[190px] h-[190px] lg:w-[300px] lg:h-[300px] rounded-lg shadow-2xl"
            />
            <motion.img
              src={helpImage}
              animate={{ x: [10, 100, 10], y: [10, -20, 10] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="w-[190px] h-[190px] lg:w-[300px] lg:h-[300px] rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex-1/2">
            <h1 className="text-5xl font-bold">Our Mission</h1>
            <p className="py-6">
              "Our mission is to reconnect people with their lost belongings by
              building a trusted community-driven platform. We believe that a
              small act of honesty can bring peace of mind to someone in need.
              Whether it’s a lost wallet or a found phone, every report
              matters."
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
