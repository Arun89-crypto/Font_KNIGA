import React, { useState } from 'react'
import BrandLogo from '../../images/logo1.png';
import BG from '../../images/BG.png';
import Google from '../../images/google.png';
import IMG2 from '../../images/Untitled.png';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';


function HomePage() {
    return (
        <>
            <div className="homepage__master">
                <nav className="flex__around width__full__pad_1">
                    <div className="left__nav__div flex__center">
                        <img src={BrandLogo} alt='brandlogo'></img>
                    </div>
                    <div className="right__nav__div flex__center">
                        <button className='button__primary transition_3s flex__center'>
                            Sign In
                            <img src={Google} alt='google' width='20px' style={{ marginLeft: '10px' }}></img>
                        </button>
                        <Link to='/exp'>
                            <button className='button__secondry transition_3s'>Explore</button>
                        </Link>
                    </div>
                </nav>
                <div className="home__div__main flex__around">
                    <div className="left__main__home__div width__50__p__2half">
                        <h1>Font<span>Kniga</span></h1>
                        <h2>A Complete Font Library</h2>
                        <div className='flex__center'>
                            <Link to='/custom'>
                                <button className='button__primary transition_3s'>Custom</button>
                            </Link>
                            <Link to='/exp'>
                                <button className='button__secondry transition_3s'>Explore</button>
                            </Link>
                        </div>
                    </div>
                    <div className="right__main__home__div width__50__p__2half">
                        <img src={BG} alt='mainbgimage'></img>
                    </div>
                </div>
                <SectionInfo />
                <Footer />
            </div>
        </>
    )
}
const SectionInfo = () => {
    return (
        <div className="flex__center width__full__pad_2half section">
            <div className='width__50__p__2half'>
                <h1>Why FontKniga ?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie laoreet risus non vehicula. Pellentesque eget nibh massa. Morbi non vulputate lorem, in sollicitudin velit. Proin tempor, justo ac eleifend dapibus, tellus augue semper magna, at suscipit leo enim in nunc. Duis non nulla libero. Aliquam sed sapien et arcu posuere congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie laoreet.</p>
            </div>
            <div className='width__50__p__2half flex__center'>
                <img src={IMG2} alt='image2'></img>
            </div>
        </div>
    )
}
export default HomePage;
