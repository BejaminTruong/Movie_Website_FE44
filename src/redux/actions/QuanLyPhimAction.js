import {
  LAY_CHI_TIET_PHIM,
  LAY_THONG_TIN_PHIM,
} from "redux/types/QuanLyPhimType";
import { quanLyPhimService } from "services/QuanLyPhimService";

export const LayChiTietPhim = (maPhim, setLoading) => {
  return (dispatch) => {
    quanLyPhimService
      .layChiTietPhim(maPhim)
      .then((response) => {
        dispatch({
          type: LAY_CHI_TIET_PHIM,
          data: response.data,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const LayThongTinPhim = (maPhim) => {
  return async (dispatch) => {
    try {
      const response = await quanLyPhimService.layThongTinPhim(maPhim);
      let temp = response.data.lichChieu
        .map((item, index) => {
          return {
            STT: index,
            tenCumRap: item.thongTinRap.tenCumRap,
            tenHeThongRap: item.thongTinRap.tenHeThongRap,
            ...item,
          };
        })
        .sort(function (a, b) {
          if (a.tenHeThongRap > b.tenHeThongRap) {
            return 1;
          }
          if (a.tenHeThongRap < b.tenHeThongRap) {
            return -1;
          }
          return 0;
        });
      dispatch({
        type: LAY_THONG_TIN_PHIM,
        data: temp,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
