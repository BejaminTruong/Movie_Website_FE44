import React from 'react'
import moment from "moment";
import Scrollchor from 'react-scrollchor';
import {Trailer} from 'components/Trailer/Trailer';
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import "./IntroMovie.scss"
import { isEmpty } from 'lodash';

export const IntroMovie = (props) => {
    
    let chiTietPhim = useSelector(state => state.QuanLyPhimReducer.chiTietPhim);
    
    return (<>
        <div className="intro__movie">              
            <div className="pageheader">
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`${props.pathName}`}>
                        {chiTietPhim.tenPhim}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>      
            <div className="intro__movie__content">
                <img src={chiTietPhim.hinhAnh} slt={chiTietPhim.tenPhim} />
                <div className="movie__content__info">
                    <h3>{chiTietPhim.tenPhim}</h3>
                    <p>* Thời Lượng: {!isEmpty(chiTietPhim.heThongRapChieu) ? chiTietPhim.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong : ""} phút</p>
                    <p>* Khởi chiếu: {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.yyyy")}</p>
                    <p>* Phụ đề: Engsub - Vietub - Thuyết Minh </p>
                    <Trailer className="btn__intro__movie" trailer={chiTietPhim.trailer}>
                        Xem Trailer
                    </Trailer>
                    <Scrollchor to="#booking__info" beforeAnimate={()=>{props.setHandleActive(1)}}  animate={{offset: -10, duration: 600}} className="btn__booking">
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
                                    <circle id="progressBar" cx="70" cy="70" r="70" ></circle>
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
    </>
    )
}
