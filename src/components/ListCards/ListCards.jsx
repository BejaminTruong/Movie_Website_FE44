import React, { Fragment } from "react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./_listCards.scss"

SwiperCore.use([Navigation, Autoplay]);

export const ListCards = ({ data, ...props }) => {
  return (
    <Swiper {...props}>
      {data?.map((phim, index) => {
        return (
          <SwiperSlide key={index} style={{ listStyle: "none" }}>
            {props.children(phim)}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
