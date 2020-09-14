import { domain } from "configs/setting";
import axios from 'axios'
export const dangKyService = (thongTinDangKy) => {
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