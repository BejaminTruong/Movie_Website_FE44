import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ListCards.scss"

export const ListCards = ({ data, ...props }) => {
  return (
    <Swiper {...props}>
      {data?.map((phim, index) => {
        return (
          <SwiperSlide key={index} style={{ listStyle: "none" }}>
            {props.children(phim,index)}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
