import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import "./DetailInformation.scss";
// import "animate.css";
import "animate.css";
export const DetailInformation = () => {
  let chiTietPhim = useSelector((state) => state.QuanLyPhimReducer.chiTietPhim);

  console.log(chiTietPhim);
  return (
    <div className="detail_movie_info animate__animated animate__fadeIn">
      <div className="movie_info">
        <ul style={{ listStyle: "none" }}>
          <li>
            <span>Ngày công chiếu</span>
            <span>
              {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.yyyy")}
            </span>
          </li>
          <li>
            <span>Đạo diễn</span>
            <span>Chưa cập nhật</span>
          </li>
          <li>
            <span>Diễn viên</span>
            <span>Chưa cập nhật</span>
          </li>
          <li>
            <span>Thể Loại</span>
            <span>Chưa cập nhật</span>
          </li>
          <li>
            <span>Định dạng</span>
            <span>2D/Digital</span>
          </li>
          <li>
            <span>Quốc gia SX</span>
            <span>Chưa cập nhật</span>
          </li>
        </ul>
      </div>
      <div className="movie_info">
        <p>Nội Dung</p>
        <p>{chiTietPhim.moTa}</p>
      </div>
    </div>
  );
};
