import React from "react";
import itemsImage from "../../assets/mission/LostFound_2.jpg";
import petsImage from "../../assets/mission/lost-pets.jpg";
import helpImage from "../../assets/mission/help.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurMission = () => {
  return (
    <section data-aos="fade-right" className="my-12">
      <div className="hero bg-base-200 min-h-[80vh] rounded-xl shadow-lg p-8">
        <div className="hero-content flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-center">
          {/* Images grid */}
          <div className="grid grid-cols-3 gap-6 lg:basis-1/2">
            {[itemsImage, petsImage, helpImage].map((img, idx) => {
              const animations = [
                { x: [10, 50, 10], y: [10, 20, 10] },
                { x: [10, 70, 10], y: [10, 70, 10] },
                { x: [10, 40, 10], y: [10, -20, 10] },
              ];
              return (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`mission-${idx}`}
                  animate={animations[idx]}
                  transition={{ duration: 12, repeat: Infinity }}
                  className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-2xl"
                />
              );
            })}
          </div>

          {/* Text content */}
          <div className="lg:basis-1/2 max-w-xl text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-6">
              <motion.span
                animate={{
                  color: [
                    "#49fc03",
                    "#fc1c03",
                    "#03e8fc",
                    "#d703fc",
                    "#fcb603",
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                Our
              </motion.span>{" "}
              <motion.span
                animate={{
                  color: [
                    "#fcb603",
                    "#d703fc",
                    "#03e8fc",
                    "#fc1c03",
                    "#49fc03",
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                Mission
              </motion.span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 text-gray-700">
              Our mission is to reconnect people with their lost belongings by
              building a trusted community-driven platform. We believe that a
              small act of honesty can bring peace of mind to someone in need.
              Whether it’s a lost wallet or a found phone, every report matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
