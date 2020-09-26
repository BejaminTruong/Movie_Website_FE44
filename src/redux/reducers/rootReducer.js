import { combineReducers } from "redux";
import QuanLyNguoiDungReducer from "./QuanLyNguoiDungReducer";
import QuanLyRapPhimReducer from "./QuanLyRapPhimReducer";
export const rootReducer = combineReducers({
  QuanLyNguoiDungReducer,
  QuanLyRapPhimReducer,
});
