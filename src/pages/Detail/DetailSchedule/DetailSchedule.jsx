import React, { useState } from "react";
import { ListCards } from "components/ListCards/ListCards";
import { CinemaID } from "configs/setting";
import { Row, Col, Space, Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import "./DetailSchedule.scss";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

export const DetailSchedule = () => {

  let DSHeThongRap = useSelector(
    (state) => state.QuanLyRapPhimReducer.DSHeThongRap
  );

  let chiTietPhim = useSelector(
    state => state.QuanLyPhimReducer.chiTietPhim
  )

  const usLogin = useSelector(state => state.QuanLyNguoiDungReducer.nguoiDung);


  let [maHeThongRap, setMaHeThongRap] = useState(CinemaID);

  const renderHeThongRap = () => {
    return DSHeThongRap?.map((rap, index) => {
      const active = rap.maHeThongRap === maHeThongRap ? "active" : "";
      return (
        <div
          className={`cinema__logo ${active}`}
          key={index}
          onClick={() => {
            setMaHeThongRap(rap.maHeThongRap);
          }}
        >
          <img
            src={rap.logo}
            alt={rap.tenHeThongRap}
            width="100%"
            height="100%"
          />
          <div className="cinema__name">
            <p>{rap.tenHeThongRap}</p>
          </div>
        </div>
      );
    });
  };

  const renderLichChieu = () => {
    const index = chiTietPhim.heThongRapChieu?.findIndex(item => item.maHeThongRap === maHeThongRap) !== -1 ? true : false;
    if(!index){
      return (
        <p style={{color:"#fff",textAlign:"center"}}>Hiện không có suất chiếu</p>
      )
    }

    return (
      <ListCards
        data={chiTietPhim.heThongRapChieu}
        scrollbar={{ draggable: true, dragSize: "auto" }}
        direction="vertical"
        tag="div"
        mousewheel
      >
        {(cumrap, index) => {
          if(cumrap.maHeThongRap === maHeThongRap){
            return (
              <>
                {cumrap.cumRapChieu.map((cumRapChieu, index) => {
                  return (
                    <Collapse
                      key={index}
                      defaultActiveKey={["1"]}
                      style={{
                        backgroundColor: "transparent",
                        padding: "10px 0",
                      }}

                      className="animate__animated animate__fadeIn"
                    >
                      <Collapse.Panel
                        key="1"
                        header={
                          <>
                            <img
                              src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-bitexco-15379552241200.jpg"
                              alt={cumRapChieu.tenCumRap}
                            />
                            <div>
                              <h3>{cumRapChieu.tenCumRap}</h3>
                            </div>
                          </>
                        }
                        className="cinema__schedule_info"
                      >
                        {cumRapChieu.lichChieuPhim.map((item, index) => {                         
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
                        })}
                      </Collapse.Panel>
                    </Collapse>
                  );
                })}
              </>
            );
          }
        }}
      </ListCards>
    );
  };

  return (
    <div className="detail__cinema animate__animated animate__fadeIn">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {renderHeThongRap()}
          </Space>
        </Col>
        <Col span={18}>{renderLichChieu()}</Col>
      </Row>
    </div>
  );
};
