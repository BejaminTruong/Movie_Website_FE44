import React from "react";
import { Card, Button } from "antd";
import moment from "moment";
import { Trailer } from "../../../../../components/Trailer/Trailer";
import {ShoppingFilled} from "@ant-design/icons";

export const TabCard = (props) => {
  const { phim } = props;

  return (
    <>
      <Card className="card" bordered={false}>
        <div className="card__img">
          <a href="#" className="detail__movie">
            <Trailer trailer={phim.trailer} />
          </a>
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
            <Button className="btn__link__booking" type="link" size="large" icon={<ShoppingFilled />}>
              Đặt Vé
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
