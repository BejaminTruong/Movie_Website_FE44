import React from "react";
import { Card } from "antd";
import moment from "moment";

const TabCard = (props) => {
  const { phim } = props;

  return (
    <>
      <Card className="card" bordered={false}>
        <img src={phim.hinhAnh} alt={phim.tenPhim} />
        <div className="card__info">
          <p className="card__title">{phim.tenPhim}</p>
          <div className="rate">
            <p>{moment(phim.ngayKhoiChieu).year()}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TabCard;
