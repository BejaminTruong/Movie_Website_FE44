import React from "react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TabCard from "../TabCard/TabCard"

SwiperCore.use([Navigation, Autoplay]);

const ListCards = (props) => {
  const { DSPhim } = props;
  return (
    <>
      <Swiper
        speed={1000}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        slidesPerColumn={2}
        slidesPerColumnFill="row"
        tag="div"
        navigation
        // autoplay
        lazy
      >
        {DSPhim?.map((phim, index) => {
          return (
            <SwiperSlide key={index} style={{ listStyle: "none" }}>
              <TabCard phim={phim} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ListCards