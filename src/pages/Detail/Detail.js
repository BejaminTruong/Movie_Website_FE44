import React, { useEffect, useState } from 'react';
import moment from "moment";
import { quanLyPhimService } from 'services/QuanLyPhimService';
import {Trailer} from 'components/Trailer/Trailer'
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import "./_detail.scss";
import { NavLink } from 'react-router-dom';

export const Detail = (props) => {

    let [chiTietPhim,setChiTietPhim] = useState([]);
    let [tenPhim,setTenPhim] = useState("");

    useEffect(()=>{
        const maPhim = props.match.params.maPhim;
        quanLyPhimService.layChiTietPhim(maPhim).then(response=>{
            setChiTietPhim(response.data)
            setTenPhim(response.data.tenPhim)
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        });
    },[])

    var i = 0;
    const move = (end) =>{
        if(!end){
            return;
        }
        if (i == 0) {
            i = 1;
            var elem = document.getElementById('progressBar');
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
        <section className="detail" onLoad={move(chiTietPhim.danhGia)} > 
            <img className="detail__img" src={chiTietPhim.hinhAnh} alt={chiTietPhim.tenPhim} />
            <div className="detail__bg"></div>
            <div className="intro__movie">              
                <div className="pageheader">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/home">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href={`${props.location.pathname}`}>
                            {chiTietPhim.tenPhim}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>      
                <div className="intro__movie__content">
                    <img src={chiTietPhim.hinhAnh} slt={chiTietPhim.tenPhim} />
                    <div className="movie__content__info">
                        <h3>{chiTietPhim.tenPhim}</h3>
                        <p>* Mô tả: {chiTietPhim.moTa}</p>
                        <p>* Khởi chiếu: {moment(chiTietPhim.ngayKhoiChieu).format("DD - MM - yyyy")}</p>
                        <p>* Phụ đề: Engsub - Vietub - Thuyết Minh </p>
                        <Trailer className="btn__intro__movie" trailer={chiTietPhim.trailer}>
                            Xem Trailer
                        </Trailer>
                        <NavLink to="/home" className="btn__booking">
                            Mua Vé
                            <i className="fas fa-ticket-alt"></i>
                        </NavLink>
                    </div>
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
        </section>
    )
}

