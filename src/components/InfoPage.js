import React, { useEffect, useState } from 'react';
import './InfoPage.css';
import AbtImage from '../images/Untitled1.png'
import Instagram from '../images/instagram.png'
import BrandLogo from '../images/logo.png';
import LoadingScreen from './LoadingScreen';


function InfoPage() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])
    return (
        <>
            {
                loading === false ? (
                    <div className="info__page">
                        <div className="images__area image__abt">
                            <img src={AbtImage} alt="" className="main__image"></img>
                            <div className="blob__big"></div>
                            <div className="blob__small"></div>
                        </div>
                        <div className="about__text">
                            <h1>About Me</h1>
                            <p>I am a Self Taught Programmer and Freelancer and currently pursuing Bachelor's degree in Computer Science Engineering.</p>
                            <p>The website is made in React js. You can check out my social media handle for more such things.</p>
                            <div>
                                <a href="https://www.instagram.com/ar_8creax9/" target="_blank" rel="noreferrer">
                                    <img src={Instagram} alt="" width="50px"></img>
                                </a>
                                <img src={BrandLogo} alt="" width="40px"></img>
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingScreen />
                )
            }
        </>
    );
}

export default InfoPage;
