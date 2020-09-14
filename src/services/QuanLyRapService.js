import axios from "axios";
import {domain} from "configs/setting";

export class QuanLyRapService{
    constructor(){}

    layThongTinHeThongRap = () =>{
        return axios({
            url:`${domain}/api/QuanLyRap/LayThongTinHeThongRap`,
            method:"GET"
            
        })
    }

    layThongTinCumRap = (maHeThongRap) =>{
        return axios({
            url:`${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
            method:"GET"
        })
    }   

    layThongTinLichChieuTheoCumRap = (maHeThongRap,maNhom)=>{
        return axios({
            url:`${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`,
            method:"GET"
        })
    }
}

export const quanLyRapSerVice = new QuanLyRapService();