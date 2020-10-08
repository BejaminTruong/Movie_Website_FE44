import {LAY_CHI_TIET_PHIM} from "redux/types/QuanLyPhimType";
import {quanLyPhimService} from "services/QuanLyPhimService";

export const LayChiTietPhim = (maPhim,setLoading) =>{
    return (dispatch) =>{
        quanLyPhimService.layChiTietPhim(maPhim).then(response=>{
            dispatch({
                type: LAY_CHI_TIET_PHIM,
                data: response.data
            })
            setLoading(false);
        }).catch(error=>{
            console.log(error)
        });
    }
}
