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

    layThongTinLichChieuTheoCumRap = (maNhom)=>{
        return axios({
            url:`${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`,
            method:"GET"
        })
    }
}

export const quanLyRapSerVice = new QuanLyRapService();