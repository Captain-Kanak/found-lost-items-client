import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import welcome from "../../assets/welcome.jpg";
import foundLostItems from "../../assets/lost-found-items.jpg";
import itemsBox from "../../assets/lost-found-box.jpg";
import { Link } from "react-router";
import { FaLocationArrow } from "react-icons/fa";

const Slider = () => {
  return (
    <div className="mt-4">
      <div className="w-full mx-auto mt-5">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
        >
          <SwiperSlide>
            <img
              src={welcome}
              className="w-full mx-auto h-[200px] md:h-[250px] lg:h-[500px] rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={foundLostItems}
              className="w-full mx-auto h-[200px] md:h-[250px] lg:h-[500px] rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex border rounded-lg">
              <img
                src={itemsBox}
                className="flex-1/2 mx-auto h-[200px] md:h-[250px] lg:h-[500px] rounded-lg"
              />
              <div className="flex-1/2 flex flex-col gap-3 lg:items-center justify-center">
                <h1 className="font-medium lg:text-4xl lg:font-bold">
                  Found Your Lost Items
                </h1>
                <Link to="/found-lost-items">
                  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl hover:ml-2 hover:bg-green-500 hover:text-white transition duration-200">
                    Found Lost Items <FaLocationArrow />
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
