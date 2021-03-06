import React from "react";
import { Card, Button } from "antd";
import moment from "moment";
import { Trailer } from "../Trailer/Trailer";
import {ShoppingFilled} from "@ant-design/icons";
import "./TabCard.scss";
import { NavLink } from "react-router-dom";

export const TabCard = (props) => {
  const { phim } = props;

  return (
    <>
      <Card className="card" bordered={false}>
        <div className="card__img">
          <NavLink to={`/detail/${phim.maPhim}`} className="detail__movie" />
          <Trailer maPhim={phim.maPhim} className="btn-trailer" trailer={phim.trailer}>
            <i className="fas fa-play-circle"></i>
          </Trailer>
          <img src={phim.hinhAnh} alt={phim.tenPhim} />
        </div>
        <div className="card__info">
          <p className="card__title">{phim.tenPhim}</p>
          <div className="card__rate">
            <p><i>{moment(phim.ngayKhoiChieu).year()}</i></p>
            <div className="star__rate">
              {}
            </div>
          </div>
          <div className="link__booking">
            <Button href={`/detail/${phim.maPhim}`} className="btn__link" type="link" size="large" icon={<ShoppingFilled />}>
              Đặt Vé
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
