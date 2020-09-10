import React from "react";
import SwiperCore, { Navigation, Autoplay, Lazy } from "swiper";
import moment from "moment";
import { Trailer } from "components/Trailer/Trailer";
import "./_carousel.scss";
import { ListCards } from "components/ListCards/ListCards";
import { NavLink } from "react-router-dom";

SwiperCore.use([Navigation, Autoplay, Lazy]);

export const Carousel = (props) => {
  let { DSPhim, DSPhimTop } = props;

  return (
    <div className="carousel">
      <div className="movie__carousel">
        <ListCards
          data={DSPhim}
          loop="true"
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          tag="div"
          navigation
          autoplay
          lazy
        >
          {(phim) => (
            <>
              <NavLink
                className="link__movie__detail--1"
                to={`/detail/${phim.maPhim}`}
              />
              <div className="trailer__title">
                <div className="movie__trailer">
                  <Trailer trailer={phim.trailer} />
                </div>
                <div className="trailer__info">
                  <h3>
                    Official Trailer <i>"{phim.tenPhim}" </i>
                  </h3>
                  <p>
                    Ngày công chiếu:{" "}
                    <i>{moment(phim.ngayKhoiChieu).format("MMMM Do YYYY")}</i>
                  </p>
                </div>
              </div>
              <img
                className="slider__img"
                src={phim.hinhAnh}
                alt={phim.tenPhim}
              />
            </>
          )}
        </ListCards>
      </div>
      <div className="movieTop">
        <h3>Top ranking</h3>
        <ListCards
          data={DSPhimTop}
          loop
          speed={1000}
          direction="vertical"
          spaceBetween={0}
          slidesPerView={3}
          slidesPerGroup={1}
          slidesPerColumnFill="column"
          freeMode="true"
          tag="div"
          autoplay
          lazy
        >
          {(phim) => (
            <div className="slide_movieTop">
              <div className="movieTop__content">
                <NavLink
                  className="link__movie__detail--2"
                  to={`/detail/${phim.maPhim}`}
                />
                <img
                  className="slider2__img"
                  src={phim.hinhAnh}
                  alt={phim.tenPhim}
                />
                <div className="movie__trailer2">
                  <Trailer trailer={phim.trailer} />
                  <NavLink
                    className="link__movie__text"
                    to={`/detail/${phim.maPhim}`}
                  >
                    Offical Trailer "<i>{phim.tenPhim}</i>"
                  </NavLink>
                  <p>
                    Ngày Chiếu:{" "}
                    <i>"{moment(phim.ngayCongChieu).format("MMMM Do YYYY")}"</i>
                  </p>
                </div>
              </div>
            </div>
          )}
        </ListCards>
      </div>
    </div>
  );
};
