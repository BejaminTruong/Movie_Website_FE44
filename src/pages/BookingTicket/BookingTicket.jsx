import React from "react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayChiTietPhongVe } from "redux/actions/QuanLyDatVeAction";
import "./BookingTicket.scss";
import { Col, Row, Spin } from "antd";
import { handleDatVe, handleReset } from "../../redux/actions/QuanLyDatVeAction";
import Loader from 'react-loader-spinner';

export const BookingTicket = (props) => {

  const dispatch = useDispatch();
  const usLogin = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const thongTinPhim = useSelector(
    (state) => state.QuanLyDatVeReducer.thongTinPhim
  );
  const danhSachGhe = useSelector(
    (state) => state.QuanLyDatVeReducer.danhSachGhe
  );

  const DatVe = useSelector((state) => state.QuanLyDatVeReducer.DatVe);

  const { Loading, handleLoading } = props;

  useEffect(() => {
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    dispatch(LayChiTietPhongVe(props.match.params.maLichChieu,handleLoading));
    
    document.getElementById("booking__ticket").onload = setTimeout(() => thoiGianGiuGhe(),1000);

    return () => {
      dispatch(handleReset());
    }
  }, []);

  var k = 0;
  const thoiGianGiuGhe = () => {
    if (k === 0) {
      k = 1;
      var minute = 5;
      var second = 0;
      var elem = document.getElementById("time");
      var clock = setInterval(tick, 1000);

      function tick() {
        if (minute === 0 && second === 0) {
          clearInterval(clock);
          k = 0;
        }

        if (second !== 0) {
          second -= 1;
        } else {
          second = 59;
          minute -= 1;
        }

        if (second >= 0 && second < 10) {
          elem.innerHTML = `${minute} : 0${second}`;
        } else {
          elem.innerHTML = `${minute} : ${second}`;
        }
      }
    }
  };

  const renderHangGhe = () => {
    const headRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let i = 0;

    return danhSachGhe.map((ghe, index) => {
      const loaiGhe = ghe.loaiGhe === "Thuong" ? "gheThuong" : "gheVip";

      const dangDat = DatVe.danhSachVe.findIndex((item) => item.maGhe === ghe.maGhe) !== -1 ? "gheDangDat" : "";
        let textHead = "";
        if (index % 16 === 0 && index !== 0) {
          i++;
          textHead = headRow[i];
        } else {
          textHead = headRow[i];
        }
        if (index % 16 === 0) {
            if (ghe.daDat) {
              return (<>
                  <p key={`${index}${textHead}`} className="headRow" style={{ display: "inline-block" }}>
                    {textHead}
                  </p>
                  <button
                    key={index}
                    disabled
                    className={`ghe ${loaiGhe} gheDaDat ${dangDat}`}
                    onClick={() => {
                      dispatch(
                        handleDatVe(
                          { maGhe: ghe.maGhe, giaVe: ghe.giaVe },
                          `${textHead}${ghe.stt}`
                        )
                      );
                    }}
                  >
                    <p>{ghe.stt}</p>
                  </button>
              </>
              );
            }

          return (
            <>
              <p key={`${index}${textHead}`} className="headRow" style={{ display: "inline-block" }}>
                {textHead}
              </p>
              <button
                key={index}
                className={`ghe ${loaiGhe} ${dangDat}`}
                onClick={() => {
                  dispatch(
                    handleDatVe(
                      { maGhe: ghe.maGhe, giaVe: ghe.giaVe },
                      `${textHead}${ghe.stt}`
                    )
                  );
                }}
              >
                <p>{ghe.stt}</p>
              </button>
            </>
          );
        }

      if (ghe.daDat) {
        return (
          <button key={index} className={`ghe ${loaiGhe} gheDaDat ${dangDat}`} disabled onClick={() => {
              dispatch(
                handleDatVe(
                  { maGhe: ghe.maGhe, giaVe: ghe.giaVe },
                  `${textHead}${ghe.stt}`
                )
              );
            }}
          >
            <p>{ghe.stt}</p>
          </button>
        );
      }

      return (
        <button
          key={index}
          className={`ghe ${loaiGhe} ${dangDat}`}
          onClick={() => {
            dispatch(
              handleDatVe(
                { maGhe: ghe.maGhe, giaVe: ghe.giaVe },
                `${textHead}${ghe.stt}`
              )
            );
          }}
        >
          <p>{ghe.stt}</p>
        </button>
      );
    });
  };

  return (
      <section className="booking__ticket animate__animated animate__fadeIn" id="booking__ticket">
          <div className="booking__ticket__img" style={{ backgroundImage: `url('${thongTinPhim.hinhAnh}')`}}>
            <div className="img__bg"></div>
          </div>
          <div className="booking__ticket__item item--1 ">
            <div className="item--1__title">
              <div className="content__left">
                <p>{thongTinPhim.tenCumRap}</p>
                <p>
                  <span>
                    {moment(thongTinPhim.ngayChieu).format("dddd, DD-MM-yyyy")}
                  </span>
                  &nbsp; - &nbsp;
                  <span>{thongTinPhim.gioChieu}</span>
                  &nbsp; - &nbsp;
                  <span>{thongTinPhim.tenRap}</span>
                </p>
              </div>
              <div className="content__right">
                <p>Thời gian giữ ghế</p>
                <p id="time">00:00</p>
              </div>
            </div>
            <div className="item--1__cine">
              <div className="cine_screen">
                <div className="cine__screen__shape"></div>
                <p>Màn Hình</p>
              </div>
            </div>
            <div className="item--1__rowchair">
              {Loading ? (
                  <div className="example" style={{ width: "100%", height: "100%",display:"flex",justifyContent:"center"}}>
                    <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                  </div>
                ) : (<>
                  <div style={{ margin: "0 auto", width: "90%" }}>
                    {renderHangGhe()}
                  </div>
                  <div className="half__circle"></div>
                </>)}
            </div>
          </div>
          <div className="booking__ticket__item item--2">
            <div
              style={{
                textAlign: "center",
                color: "#44C020",
                fontSize: "28px",
                fontWeight: "600",
              }}
            >
              <p>{DatVe.tongTien} đ</p>
            </div>
            <div className="booking__handle__title">
              <p>{thongTinPhim.tenPhim}</p>
              <p>{thongTinPhim.tenCumRap}</p>
              <p>
                <span>
                  {moment(thongTinPhim.ngayChieu).format("dddd, DD-MM-yyyy")}
                </span>
                &nbsp; - &nbsp;
                <span>{thongTinPhim.gioChieu}</span>
                &nbsp; - &nbsp;
                <span>{thongTinPhim.tenRap}</span>
              </p>
            </div>
            <div className="booking__handle__info">
              <Row>
                <Col span={4} style={{ color: "red" }}>
                  <p>Ghế</p>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", flexWrap: "wrap", color: "red" }}
                >
                  {DatVe.hangGhe.map((ghe, index) => {
                    return <p key={index}>{ghe},&nbsp;</p>;
                  })}
                </Col>
                <Col
                  span={8}
                  style={{
                    textAlign: "right",
                    color: "#44C020",
                    fontWeight: "600",
                  }}
                >
                  <p>{DatVe.tongTien} đ</p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <p>Email</p>
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <p>{usLogin.email}</p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <p>Phone</p>
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <p>{usLogin.soDT ? usLogin.soDT : "Chưa bổ sung"}</p>
                </Col>
              </Row>
            </div>
          </div>
       
      </section>
  );
};
