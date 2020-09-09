import React,{Fragment, useState} from 'react'
import {Route} from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
const HomeComponent = (props) =>{
    const {Loading} = props;
    return <Fragment>
        <Header />
        {props.children}
        {!Loading ? <Footer Loading={Loading} /> : <></>}
    </Fragment>
}

export const HomeTemplate = ({Component,...rest}) =>{

    let [isLoading,setIsLoading] = useState(true);

    const handleLoading = () =>{
        setIsLoading(false);
    }

    return <Route {...rest} render={(props)=>{
        return <HomeComponent Loading={isLoading}>
            <Component {...props} handleLoading={handleLoading}/>
        </HomeComponent>
    }} />
}