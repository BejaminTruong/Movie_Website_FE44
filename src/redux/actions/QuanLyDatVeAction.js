import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { LAY_CHI_TIET_PHONG_VE, DAT_VE, THANH_TOAN, RESET_DATA } from "redux/types/QuanLyDatVeType";

export const LayChiTietPhongVe = (maLichchieu,handleLoading) =>{
    return (dispatch) =>{
        quanLyDatVeService.layChiTietPhongVe(maLichchieu).then(response =>{
            dispatch({
                type: LAY_CHI_TIET_PHONG_VE,
                thongTinPhim: response.data.thongTinPhim,
                danhSachGhe: response.data.danhSachGhe
            })
            handleLoading();
            console.log("1")
        }).catch(error=>{
            console.log(error);
        })
    }
}

export const handleDatVe = (ghe,hangGhe) =>{
    return (dispatch) =>{
        dispatch({
            type: DAT_VE,
            ghe: ghe,
            hangGhe: hangGhe
        })
    }
}

export const handleThanhToan = (usBooking) =>{
    return (dispatch) =>{
        quanLyDatVeService.handleDatVe(usBooking).then(response =>{
            dispatch({
                type: THANH_TOAN
            })
            console.log(response.data);
        }).catch(errors=>{
            console.log(errors)
        })
    }
}

export const handleReset = () =>{
    return (dispatch) =>{
        dispatch({
            type:RESET_DATA
        })
    }
}