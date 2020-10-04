import axios from 'axios'
import {domain} from 'configs/setting'

export class QuanLyPhimService{
    constructor(){}

    layDanhSachPhim = (groupID) =>{
        return axios({
            url:`${domain}/api/quanlyphim/laydanhsachphim?manhom=${groupID}`,
            method:"GET"
        })
    }
    layChiTietPhim = (maPhim) =>{
        return axios({
            url:`${domain}/api/quanlyrap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            method:"GET"
        })
    }
  

    // layThongTinTrailer = (id) =>{
    //     return axios({
    //         url:`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`,
    //         method:"GET",
    //         headers:{'Access-Control-Allow-Origin': '*'},
    //     })
    // }
}

export const quanLyPhimService = new QuanLyPhimService();