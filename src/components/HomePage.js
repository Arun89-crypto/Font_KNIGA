import React, { useState, useEffect } from 'react'
import BrandLogo from '../images/logo.png';
import BrandLogo1 from '../images/logo1.png';
import './HomePage.css';
import CenterImage from '../images/Saly-12.png';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';


function HomePage() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])
    return (
        <>
            {loading === false ? (
                <div className="main">
                    <nav>
                        <img src={BrandLogo} alt="" className="logo"></img>
                        <img src={BrandLogo1} alt="" className="logo1"></img>
                    </nav>
                    <div className="main__section">

                        <div className="images__area">
                            <img src={CenterImage} alt="" className="main__image"></img>
                            <div className="blob__big"></div>
                            <div className="blob__small"></div>
                            <Link to="/exp">
                                <button className="explore__button">Explore</button>
                            </Link>
                            <Link to="/info">
                                <button className="info__button">info</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    )
}

export default HomePage;
