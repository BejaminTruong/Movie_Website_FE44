import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { HomeTemplate } from "templates/HomeTemplate/HomeTemplate"
import Home from "pages/Home/Home"
import 'antd/dist/antd.css'
import "App.scss"
import { Login } from 'pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate exact path="/login" Component={Login}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
