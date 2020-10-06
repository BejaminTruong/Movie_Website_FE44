import React from "react";
import { Card, Button } from "antd";
import moment from "moment";
import { Trailer } from "../Trailer/Trailer";
import {ShoppingFilled} from "@ant-design/icons";
import "./TabCard.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

export const TabCard = (props) => {
  const { phim } = props;

  let usLogin = useSelector(state => state.QuanLyNguoiDungReducer.nguoiDung);

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
            {
              !isEmpty(usLogin) ? (
                <Button href={`/bookingticket/${phim.maPhim}`} className="btn__link" type="link" size="large" icon={<ShoppingFilled />}>
                  Đặt Vé
                </Button>
              ) :
              (
                <Button href="/login" className="btn__link" type="link" size="large" icon={<ShoppingFilled />}>
                  Đặt Vé
                </Button>
              )
            }
          </div>
        </div>
      </Card>
    </>
  );
};
