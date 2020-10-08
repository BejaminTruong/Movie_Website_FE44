import { domain, accessToken } from "configs/setting";
import axios from "axios";
export class QuanLyNguoiDungService {
  dangKyService = (thongTinDangKy) => {
    return (async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${domain}/api/QuanLyNguoiDung/DangKy`,
          data: thongTinDangKy,
        });
        console.log(result.data);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  };
  layThongTinTaiKhoan = (userName) => {
    return axios({
      method: "post",
      url: `${domain}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
      data: userName,
    });
  };
  capNhatThongTinTaiKhoan = (updateInfo) => {
    return axios({
      method: "PUT",
      url: `${domain}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data: updateInfo,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem(accessToken)
        )}`,
      },
    });
  };
  xoaTaiKhoanNguoiDung = (taiKhoan) => {
    return axios({
      method: "DELETE",
      url: `${domain}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem(accessToken)
        )}`,
      },
    });
  };
  layDanhSachNguoiDungPhanTrang = (currentPage, count, groupID) => {
    return axios({
      method: "GET",
      url: `${domain}/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${groupID}&soTrang=${currentPage}&soPhanTuTrenTrang=${count}`,
    });
  };
  timKiemNguoiDung = (groupID, keyWord) => {
    return axios({
      method: "GET",
      url: `${domain}/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${groupID}&tuKhoa=${keyWord}`,
    });
  };
  themNguoiDung = (userInfo) => {
    return axios({
      method: "POST",
      url: `${domain}/api/QuanLyNguoiDung/ThemNguoiDung`,
      data: userInfo,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem(accessToken)
        )}`,
      },
    });
  };
}
export const qlNguoiDungService = new QuanLyNguoiDungService();
