import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate"
import Home from "./pages/Home/Home"
import 'antd/dist/antd.css'
import "./App.scss"

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/' Component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
