import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import welcome from "../../assets/welcome.jpg";
import foundLostItems from "../../assets/lost-found-items.jpg";
import itemsBox from "../../assets/lost-found-box.jpg";
import { Link } from "react-router";
import { FaLocationArrow } from "react-icons/fa";

const slides = [
  {
    id: 1,
    img: welcome,
    alt: "Welcome",
    title: "Welcome to Find & Return",
  },
  {
    id: 2,
    img: foundLostItems,
    alt: "Lost and Found Items",
    title: "Browse Lost & Found Items",
  },
  {
    id: 3,
    img: itemsBox,
    alt: "Found Your Lost Items",
    title: "Found Your Lost Items",
  },
];

const Slider = () => {
  return (
    <div className="mt-6 max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        preventClicks={false}
        preventClicksPropagation={false}
        className="rounded-lg overflow-hidden"
      >
        {slides.map(({ id, img, alt, title }) => (
          <SwiperSlide key={id}>
            <div className="relative group cursor-pointer rounded-lg overflow-hidden">
              <img
                src={img}
                alt={alt}
                className="w-full h-[250px] md:h-[350px] lg:h-[500px] object-cover rounded-lg"
              />

              <div
                className="absolute inset-0 
             bg-gradient-to-t from-black/90 via-black/60 to-black/40
             group-hover:from-transparent group-hover:via-transparent group-hover:to-transparent
             transition-colors duration-700 ease-in-out rounded-lg"
              />

              <div
                className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center 
                    transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 
                    pointer-events-none rounded-lg"
              >
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
                  {title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
