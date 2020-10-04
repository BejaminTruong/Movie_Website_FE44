import axios from "axios";
import { domain } from "configs/setting";

export class QuanLyDatVeService {
  constructor() {}

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

  TaoLichChieu = (usAdmin) => {
    return axios({
      url: `${domain}/api/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data: usAdmin.data,
      headers: {
        Authorization: `Bearer ${usAdmin.accessToken}`,
      },
    });
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
