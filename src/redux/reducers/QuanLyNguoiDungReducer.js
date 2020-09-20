import { dang_nhap } from "redux/types/QuanLyNguoiDungType";
import { userLogin } from "configs/setting";
let usLogin = {};
if (localStorage.getItem(userLogin)) {
  usLogin = JSON.parse(localStorage.getItem(userLogin));
}
const initialState = {
  nguoiDung: usLogin,
  status: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case dang_nhap: {
      return { ...state, status: "success", nguoiDung: action.nguoiDung };
    }
    case "ERROR":{
      return {...state, status: "error"}
    }
    default:
      return state;
  }
};
