import React, { useEffect, useState } from 'react';
import Load from "images/Loading.gif";
import { useDispatch, useSelector } from 'react-redux';
import { LayThongTinCinema } from "redux/actions/QuanLyRapPhimAction";
import { LayChiTietPhim } from "redux/actions/QuanLyPhimAction";
import { IntroMovie } from './IntroMovie/IntroMovie';
import { useParams } from 'react-router-dom';

import "./Detail.scss";

import { DetailCinema } from './DetailCinema/DetailCinema';

export const Detail = () => {

    let dispatch = useDispatch();
    
    let chiTietPhim = useSelector(state => state.QuanLyPhimReducer.chiTietPhim);
    let [handleActive,setHandleActive] = useState(0);
    let {maPhim} = useParams();

    let [ Loading, setLoading ] = useState(true);

    const initial = () =>{
        dispatch(LayChiTietPhim(maPhim,setLoading));
        dispatch(LayThongTinCinema());
    }
    useEffect(initial,[])
    
    return (<>
        {Loading ? (
            <div style={{ width: "100%", height: "100%" }}>
                <img src={Load} alt="Loading..." width="100%" height="100%" />
            </div>
        ) : (
            <section className="detail animate__animated animate__fadeIn"> 
                <img className="detail__img" src={chiTietPhim.hinhAnh} alt={chiTietPhim.tenPhim} />
                <div className="detail__bg"></div>
                <IntroMovie setHandleActive={setHandleActive} />
                <DetailCinema handleActive={handleActive} setHandleActive={setHandleActive} />
        </section>
        )}
    </>)
}

