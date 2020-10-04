import {LAY_CHI_TIET_PHIM} from "redux/types/QuanLyPhimType";
import {quanLyPhimService} from "services/QuanLyPhimService";

export const LayChiTietPhim = (maPhim) =>{
    return (dispatch) =>{
        quanLyPhimService.layChiTietPhim(maPhim).then(response=>{
            dispatch({
                type: LAY_CHI_TIET_PHIM,
                data: response.data
            })
        }).catch(error=>{
            console.log(error)
        });
    }
}
