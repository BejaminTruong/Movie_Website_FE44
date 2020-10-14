import React, { useEffect, useState , useRef } from 'react';
import Load from "images/Loading.gif";
import { useDispatch, useSelector } from 'react-redux';
import { LayThongTinCinema } from "redux/actions/QuanLyRapPhimAction";
import { LayChiTietPhim } from "redux/actions/QuanLyPhimAction";
import { DetailSchedule } from './DetailSchedule/DetailSchedule';
import { IntroMovie } from './IntroMovie/IntroMovie';
import { DetailInformation } from './DetailInformation/DetailInformation';
import { useParams } from 'react-router-dom';

import "./Detail.scss";

export const Detail = (props) => {

    let dispatch = useDispatch();
    const progressBarRef = useRef(); 
    let chiTietPhim = useSelector(state => state.QuanLyPhimReducer.chiTietPhim);
    let [handleActive,setHandleActive] = useState(0);
    let {maPhim} = useParams();

    let [ Loading, setLoading ] = useState(true);

    const initial = () =>{
        dispatch(LayChiTietPhim(maPhim,setLoading));
        dispatch(LayThongTinCinema());
    }
    useEffect(initial,[])
    
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

    return (<>
        {Loading ? (
            <div style={{ width: "100%", height: "100%" }}>
            <img src={Load} alt="Loading..." width="100%" height="100%" />
            </div>
        ) : (
            <section className="detail animate__animated animate__fadeIn" onLoad={() => move(chiTietPhim.danhGia)} > 
                <img className="detail__img" src={chiTietPhim.hinhAnh} alt={chiTietPhim.tenPhim} />
                <div className="detail__bg"></div>
                <IntroMovie pathName={props.location.pathname} setHandleActive={setHandleActive} progressBarRef={progressBarRef} />
                <div className="detail__cinema__title" id="booking__info">
                    <span className={handleActive === 0 || handleActive === 1 ? "active" : ""} onClick={()=>setHandleActive(1)}>Lịch Chiếu</span>
                    <span className={handleActive === 2 ? "active" : ""} onClick={()=>setHandleActive(2)}>Thông Tin</span>
                </div>
                {
                    handleActive === 1 || handleActive === 0 ? <DetailSchedule /> :  <DetailInformation />
                }
        </section>
        )}
    </>)
}

