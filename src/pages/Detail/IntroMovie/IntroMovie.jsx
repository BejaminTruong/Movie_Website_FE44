import React, { useRef } from 'react'
import moment from "moment";
import Scrollchor from 'react-scrollchor';
import {Trailer} from 'components/Trailer/Trailer';
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import "./IntroMovie.scss";

export const IntroMovie = (props) => {
    
    let chiTietPhim = useSelector(state => state.QuanLyPhimReducer.chiTietPhim);
    const progressBarRef = useRef(); 
    const pathName = useHistory().location.pathname;
    
    var i = 0;
    const move = (end) =>{
        if(!end){
            return;
        }
        if (i === 0) {
            i = 1;
            var elem = progressBarRef.current;
            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= end * 10) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.strokeDashoffset = `calc(440 - (440 * ${width}) / 100)`;
                }
            }
        }
    }

    return (
        <div className="intro__movie" onLoad={() => move(chiTietPhim.danhGia)} >              
            <div className="pageheader">
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`${pathName}`}>
                        {chiTietPhim.tenPhim}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>      
            <div className="intro__movie__content">
                <img src={chiTietPhim.hinhAnh} alt={chiTietPhim.tenPhim} />
                <div className="movie__content__info">
                    <h3>{chiTietPhim.tenPhim}</h3>
                    <p>* Thời Lượng: {!isEmpty(chiTietPhim.heThongRapChieu) ? chiTietPhim.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong : ""} phút</p>
                    <p>* Khởi chiếu: {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.yyyy")}</p>
                    <p>* Phụ đề: Engsub - Vietub - Thuyết Minh </p>
                    <Trailer maPhim={chiTietPhim.maPhim} className="btn__intro__movie" trailer={chiTietPhim.trailer}>
                        Xem Trailer
                    </Trailer>
                    <Scrollchor to="booking__info" beforeAnimate={()=>{props.setHandleActive(1)}}  animate={{offset: -10, duration: 600}} className="btn__booking">
                        Mua Vé
                        <i className="fas fa-ticket-alt"></i>
                    </Scrollchor>
                </div>
                <div style={{width:"30%"}}>
                    <div className="rate">
                        <div className="box">
                            <div className="percent">
                                <svg>
                                    <circle cx="70" cy="70" r="70"></circle>
                                    <circle ref={progressBarRef}  cx="70" cy="70" r="70" ></circle>
                                </svg>
                                <div className="number">
                                    <h2>{chiTietPhim.danhGia}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
