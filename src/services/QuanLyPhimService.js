import axios from 'axios'
import {domain, accessToken} from 'configs/setting'

export class QuanLyPhimService{

    layDanhSachPhim = (groupID) =>{
        return axios({
            url:`${domain}/api/quanlyphim/laydanhsachphim?manhom=${groupID}`,
            method:"GET"
        });
    }

    layDanhSachPhimPhantrang = (soTrang,soPhanTu,maNhom) =>{
        return axios({
            url: `${domain}/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
            method: "GET",
        })
    }
    
    layThongTinPhim = (maPhim) =>{
        return axios({
            url:`${domain}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
            method:"GET"
        });
    }

    layChiTietPhim = (maPhim) =>{
        return axios({
            url:`${domain}/api/quanlyrap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            method:"GET"
        });
    }

    TaoLichChieu = (adLichChieu) => {
        return axios({
          url: `${domain}/api/QuanLyDatVe/TaoLichChieu`,
          method: "POST",
          data: adLichChieu,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(accessToken))}`,
          },
        });
      };

    ThemPhim = (adThemPhim) => {
        return axios({
            url: `${domain}/api/QuanLyPhim/ThemPhim`,
            method: "POST",
            data: adThemPhim,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(accessToken))}`,
            }
        });
    }

    upLoadHinhAnhPhim = (adUploadHinh) =>{
        return axios({
            url: `${domain}/api/QuanLyPhim/UploadHinhAnhPhim`,
            method: "POST",
            data: adUploadHinh,
            headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(accessToken))}`,
            }
        });
    }

    XoaPhim = (maPhim) =>{
        return axios({
            url: `${domain}/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(accessToken))}`,
            }
        })
    }

    CapNhatPhim = (adCapNhatPhim) => {
        return axios({
            url: `${domain}/api/QuanLyPhim/CapNhatPhim`,
            method:"POST",
            data: adCapNhatPhim,
            headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(accessToken))}`,
            }
        })
    }
}

export const quanLyPhimService = new QuanLyPhimService();