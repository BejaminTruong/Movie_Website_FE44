import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { HomeTemplate } from "templates/HomeTemplate/HomeTemplate";
import Home from "pages/Home/Home";
import { Login } from "pages/Login/Login";
import { Register } from "pages/Register/Register";
import { Account } from "pages/Account/Account";
import { Detail } from "pages/Detail/Detail";
import { AdminTemplate } from "templates/AdminTemplate/AdminTemplate";
import { UserAdmin } from "pages/Admin/UserAdmin/UserAdmin";
import { BookingTicket } from "pages/BookingTicket/BookingTicket";
import "animate.css";
import "antd/dist/antd.css";
import { AddUser } from "./pages/Admin/AddUser/AddUser";
import { AdminMovie } from "./pages/AdminMovie/AdminMovie";
function App() {
  return (
    <BrowserRouter>
      <Route exact>
        <AdminTemplate exact path="/admin/movieadmin" Component={AdminMovie} />
        <AdminTemplate exact path="/admin/useradmin/adduser" Component={AddUser}/>
        <AdminTemplate exact path="/admin/useradmin" Component={UserAdmin} />
        <AdminTemplate exact path="/admin" Component={UserAdmin} />
      </Route>
      <HomeTemplate exact path="/home" Component={Home} />
      <HomeTemplate exact path="/login" Component={Login} />
      <HomeTemplate exact path="/register" Component={Register} />
      <HomeTemplate exact path="/account" Component={Account} />
      <HomeTemplate exact path="/detail/:maPhim" Component={Detail} />
      <HomeTemplate exact path="/bookingticket/:maLichChieu" Component={BookingTicket} />
      <HomeTemplate exact path="/" Component={Home} />
      {/* <Route exact>
          <AdminTemplate exact path="/admin/useradmin" Component={UserAdmin} />
          <AdminTemplate exact path="/admin" Component={UserAdmin} />
        </Route>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/login" Component={Login} />
        <HomeTemplate exact path="/register" Component={Register} />
        <HomeTemplate exact path="/account" Component={Account} />
        <HomeTemplate exact path="/detail/:maPhim" Component={Detail} />
        <HomeTemplate exact path="/bookingticket/:maLichChieu" Component={BookingTicket} />
        <HomeTemplate exact path="/" Component={Home} /> */}
      {/* >>>>>>> 6dd7db92e6b940044999a0c64b9ae2d59addfec4 */}
    </BrowserRouter>
  );
}

export default App;
