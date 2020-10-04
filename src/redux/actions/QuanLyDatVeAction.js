import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { LAY_CHI_TIET_PHONG_VE, DAT_VE } from "redux/types/QuanLyDatVeType";

export const LayChiTietPhongVe = (maLichchieu) =>{
    return (dispatch) =>{
        quanLyDatVeService.layChiTietPhongVe(maLichchieu).then(response =>{
            dispatch({
                type: LAY_CHI_TIET_PHONG_VE,
                thongTinPhim: response.data.thongTinPhim,
                danhSachGhe: response.data.danhSachGhe
            })
        }).catch(error=>{
            console.log(error);
        })
    }
}