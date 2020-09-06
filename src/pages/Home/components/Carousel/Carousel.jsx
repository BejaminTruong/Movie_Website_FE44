import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Autoplay, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from 'moment'
import {Trailer} from "../../../../components/Trailer/Trailer";

SwiperCore.use([Navigation, Autoplay, Lazy]);

export const Carousel = (props) => {
  let {DSPhim} = props;

  const DSPhimTopRanking = (DSPhim) => {
    let DSPhimTopRanking = [];
    DSPhim.forEach((phim) => {
      const rate = +phim.danhGia;
      if (rate >= 8 && rate <= 10) {
        DSPhimTopRanking.push(phim);
      }
    });

    return DSPhimTopRanking;
  };

  return (
    <div className="carousel">
      <a href="#" className="movie__carousel">
        <Swiper
          loop="true"
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          tag="div"
          wrapperTag="ul"
          navigation
          autoplay
          lazy
        >
          {DSPhim?.map((phim, index) => {
            return (
              <SwiperSlide tag="li" key={index} style={{ listStyle: "none" }}>
                <div className="trailer__title">
                  <div className="movie__trailer">
                    <Trailer trailer={phim.trailer} />
                  </div>
                  <div className="trailer__info">
                    <h3>Movie Trailer <i>"{phim.tenPhim}" </i></h3>
                    <p>Ngày công chiếu: <i>{moment(phim.ngayKhoiChieu).format('MMMM Do YYYY') }</i></p>
                  </div>
                </div>
                <img
                  className="slider__img"
                  src={phim.hinhAnh}
                  alt={phim.tenPhim}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </a>
      <div className="movieTop">
        <h3>Top ranking</h3>
        <Swiper
          speed={1000}
          direction="vertical"
          spaceBetween={0}
          slidesPerView={3}
          slidesPerGroup={1}
          freeMode="true"
          tag="div"
          wrapperTag="ul"
          autoplay
          lazy
        >
          {DSPhimTopRanking(DSPhim)?.map((phim, index) => {
            return (
              <SwiperSlide tag="li" key={index} style={{ listStyle: "none" }}>
                <a href="#" className="movieTop__content">
                  <img
                    className="slider2__img"
                    src={phim.hinhAnh}
                    alt={phim.tenPhim}
                  />
                  <div className="movie__trailer2">
                    <Trailer trailer={phim.trailer} />
                    <h3>{phim.tenPhim}</h3>
                    <p>{phim.biDanh}</p>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

