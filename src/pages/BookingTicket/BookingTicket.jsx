import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayChiTietPhongVe } from 'redux/actions/QuanLyDatVeAction';


export const BookingTicket = (props) => {
    let dispatch = useDispatch();
    let usLogin = useSelector(state => state.QuanLyNguoiDungReducer.nguoiDung);
    let thongTinPhim = useSelector(state => state.QuanLyDatVeReducer.thongTinPhim);
    let danhSachGhe = useSelector(state => state.QuanLyDatVeReducer.danhSachGhe);

    useEffect(()=>{
        dispatch(LayChiTietPhongVe(props.match.params.maLichChieu));
    },[])

    console.log(usLogin)
    return (
        <div>
            
        </div>
    )
}
