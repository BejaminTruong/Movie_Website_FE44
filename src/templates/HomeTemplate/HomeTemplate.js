import React,{Fragment} from 'react'
import {Route} from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'
import { BackTop } from 'antd';
import "./HomeTemplate.scss"
const HomeComponent = (props) =>{
    return <Fragment>
        <Header />
        {props.children}
        <Footer/>
        <BackTop className="backTop"/>
    </Fragment>
}

export const HomeTemplate = ({Component,...rest}) =>{
    return <Route {...rest} render={(props)=>{
        return <HomeComponent>
            <Component {...props} />
        </HomeComponent>
    }} />
}