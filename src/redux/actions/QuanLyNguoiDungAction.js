import { dang_nhap } from "redux/types/QuanLyNguoiDungType";
import { userLogin, accessToken } from "configs/setting";
import { domain } from "configs/setting";
import axios from "axios";
export const dangNhapAction = (thongTinDangNhap) => {
  return (dispatch) => {
    (async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${domain}/api/quanlynguoidung/dangnhap`,
          data: thongTinDangNhap,
        });
        console.log(result.data);
        localStorage.setItem(userLogin, JSON.stringify(result.data));
        localStorage.setItem(
          accessToken,
          JSON.stringify(result.data.accessToken)
        );
        dispatch({
          type: dang_nhap,
          nguoiDung: result.data,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  };
};

