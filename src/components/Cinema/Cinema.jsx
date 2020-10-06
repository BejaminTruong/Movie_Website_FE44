import React, { useState } from "react";
import { Row, Col, Space, Collapse } from "antd";
import { ListCards } from "components/ListCards/ListCards";
import moment from "moment";
import SwiperCore, { Scrollbar, Lazy, Mousewheel } from "swiper";
import "swiper/swiper.scss";
import "./Cinema.scss";
import { useDispatch, useSelector } from "react-redux";
import {handleSetDSCumRap} from "redux/actions/QuanLyRapPhimAction";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

SwiperCore.use([Scrollbar, Lazy, Mousewheel]);

export const Cinema = () => {
  const dispatch = useDispatch();
  const DSHeThongRap = useSelector((state) => state.QuanLyRapPhimReducer.DSHeThongRap);
  const DSCumRap = useSelector((state) => state.QuanLyRapPhimReducer.DSCumRap);
  const DSLichChieu = useSelector((state) => state.QuanLyRapPhimReducer.DSLichChieu);
  const usLogin = useSelector(state => state.QuanLyNguoiDungReducer.nguoiDung);

  let [maHeThongRap, setMaHeThongRap] = useState(0);
  let [maCumRap, setMaCumRap] = useState(0);

  const renderHeThongRap = () => {
    return DSHeThongRap?.map((rap, index) => {
      const active = index === maHeThongRap ? "active" : "";

      return (
        <div className={`cinema__logo ${active}`} key={index} onClick={() => { 
            dispatch(handleSetDSCumRap(rap.maHeThongRap));
            setMaHeThongRap(index);
            setMaCumRap(0);
          }}>
          <img src={rap.logo} alt={rap.tenHeThongRap} width="100%"height="100%"/>
        </div>
      );
    });
  };

  const renderCumRap = () => {
    return (
      <ListCards data={DSCumRap} scrollbar={{ draggable: true, dragSize: "auto" }} lazy direction="vertical" freeMode tag="div"mousewheel>
        {(cumrap, index) => {
          const active = index === maCumRap ? "active" : "";

          return (
            <div className={`cinema__branch ${active}`} key={index} onClick={() => {
                setMaCumRap(index);
              }}>
              <div className="cinema__branch__img">
                <img
                  src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-bitexco-15379552241200.jpg"
                  alt={cumrap.tenCumRap}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="cinema__branch__info">
                <h3>{cumrap.tenCumRap}</h3>
                <p>Địa Chỉ: {cumrap.diaChi}</p>
                <p>[Chi Tiết]</p>
              </div>
            </div>
          );
        }}
      </ListCards>
    );
  };

  const renderLichChieu = () => {
    const LichChieu = DSLichChieu?.find(
      (item) => item.maCumRap === DSCumRap[maCumRap].maCumRap
    );

    if (LichChieu) {
      return (
        <ListCards
          data={LichChieu.danhSachPhim}
          scrollbar
          freeMode
          lazy
          direction="vertical"
          tag="div"
          mousewheel>
          {(phim, index) => {
            return (
              <div className="cinema__schedule" key={index}>
                <div className="cinema__schedule__img">
                  <Collapse defaultActiveKey={['1']} style={{backgroundColor:"transparent"}} className="cinema__schedule__content">
                    <Collapse.Panel key="1" header={<>
                      <img src={phim.hinhAnh} alt={phim.tenPhim} />
                      <h3>{phim.tenPhim}</h3>
                    </>
                    }  className="cinema__schedule_info">
                      {phim.lstLichChieuTheoPhim.map((item, index) => {                       
                          return !isEmpty(usLogin) ? (
                            <NavLink to={`/bookingticket/${item.maLichChieu}`} key={index} className="schedule__second">
                              <span>
                                {moment(item.ngayChieuGioChieu).format("hh:mm A")}
                              </span>
                            </NavLink>
                          ):(
                            <NavLink to="/login" key={index} className="schedule__second">
                              <span>
                                {moment(item.ngayChieuGioChieu).format("hh:mm A")}
                              </span>
                            </NavLink>
                          )                        
                      })};
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </div>
            )
          }}
        </ListCards>
      )};
    return <></>;
  };

  return (
    <section className="cinema">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={3}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {renderHeThongRap()}
          </Space>
        </Col>
        <Col span={9}>{renderCumRap()}</Col>
        <Col span={12}>{renderLichChieu()}</Col>
      </Row>
    </section>
  );
};
