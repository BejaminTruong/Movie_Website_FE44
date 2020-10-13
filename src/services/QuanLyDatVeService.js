import axios from "axios";
import { domain } from "configs/setting";

export class QuanLyDatVeService {

  layChiTietPhongVe = (maLichChieu) => {
    return axios({
      url: `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      method: "GET",
    });
  };

  handleDatVe = (usBooking) => {
    return axios({
      url: `${domain}/api/QuanLyDatVe/DatVe`,
      method: "POST",
      data: usBooking.data,
      headers: {
        Authorization: `Bearer ${usBooking.accessToken}`,
      },
    });
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
