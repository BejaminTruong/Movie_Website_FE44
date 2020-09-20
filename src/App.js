import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { HomeTemplate } from "templates/HomeTemplate/HomeTemplate"
import Home from "pages/Home/Home"
import 'antd/dist/antd.css'
import "App.scss"
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import { Detail } from 'pages/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate exact path="/login" Component={Login}/>
        <HomeTemplate exact path="/register" Component={Register}/>
        <HomeTemplate exact path="/detail/:maPhim" Component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;
