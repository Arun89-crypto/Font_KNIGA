import React from 'react'
import './LoadingScreen.css'
import BrandLogo from '../../images/logo1.png';

function LoadingScreen() {
    return (
        <div className="loading">
            <img className="loader" src={BrandLogo} alt=""></img>
        </div>
    )
}

export default LoadingScreen;
