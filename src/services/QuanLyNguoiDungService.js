import { domain } from "configs/setting";
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
}
export const qlNguoiDungService = new QuanLyNguoiDungService();
