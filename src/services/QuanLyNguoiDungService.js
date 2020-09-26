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
}
export const qlNguoiDungService = new QuanLyNguoiDungService();
