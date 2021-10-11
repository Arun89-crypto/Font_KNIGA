import React, { useEffect, useState } from 'react'
import BrandLogo from '../../images/logo1.png';
import BG from '../../images/BG.png';
import Google from '../../images/google.png';
import IMG2 from '../../images/Untitled.png';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Gfonts from '../../images/gfonts.png';
import Uigradients from '../../images/uigradients.svg'
import db, { auth, provider } from '../../Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import GoToTop from '../Gototop';


function HomePage() {
    //state provider
    const [{ user }, dispatch] = useStateValue();
    //sign in function
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message));
    }
    //creating the database
    const databaseFunction = () => {
        db.collection('USERS_KNIGA').doc(user.email).get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                console.log('no documents in collection');
                db.collection("USERS_KNIGA").doc(user.email).set({
                    name: user.displayName,
                    email: user.email,
                    saved_cards: []
                })
            }
        })
    }
    const [id, setId] = useState('');
    useEffect(() => {
        if (user) {
            console.log(user.Aa);
            setId(user.Aa);
            databaseFunction();
        }
    }, [user])
    return (
        <>
            <div className="homepage__master">
                <nav className="flex__around width__full__pad_1">
                    <div className="left__nav__div flex__center">
                        <img src={BrandLogo} alt='brandlogo'></img>
                    </div>
                    <div className="right__nav__div flex__center">
                        {
                            (!user) ? (
                                <button className='button__primary transition_3s flex__center' onClick={signIn}>
                                    Sign In
                                    <img src={Google} alt='google' width='20px' style={{ marginLeft: '10px' }}></img>
                                </button>
                            ) : (
                                <Link to={`/account/${id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                    <button className='button__primary transition_3s flex__center'>
                                        <p>Account</p>
                                    </button>
                                </Link>
                            )
                        }

                        <Link to='/exp'>
                            <button className='button__secondry transition_3s'>Explore</button>
                        </Link>
                    </div>
                </nav>
                <div className="home__div__main flex__around">
                    <div className="left__main__home__div width__50__p__2half">
                        <h1>A complete font<span> Library</span></h1>
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
                <GoToTop />
            </div>
        </>
    )
}
const SectionInfo = () => {
    return (
        <div className="flex__center__vert width__full__pad_2half section">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='wave wave__up' ><path fill="#fff" fill-opacity="1" d="M0,224L60,208C120,192,240,160,360,128C480,96,600,64,720,69.3C840,75,960,117,1080,117.3C1200,117,1320,75,1380,53.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            <div className='width__50__p__2half flex__center__vert question'>
                <h1>Why <span>FontKniga</span> ?</h1>
                <p style={{ textAlign: 'center' }}>Here you can find the best fonts and best color combinations precisely matched <br></br>If you want to create your own you can create your own highly customizable theme within seconds.. </p>
                <p style={{ textAlign: 'center' }}></p>
            </div>
            <h1 className='cards__heading'>Thanks for making this possible.</h1>
            <div className='info__section__cards flex__center'>
                <div className='info__card flex__center__vert'>
                    <img src='https://coolors.co/assets/img/logo.svg' className='brand__logo' alt='487453'></img>
                    <p className='brand__info'>Used Coolors for getting the colors for the cards generated in the website</p>
                    <a href='https://coolors.co/' target='_blank' rel="noreferrer">Coolors &rarr;	</a>
                </div>
                <div className='info__card flex__center__vert'>
                    <img src={Gfonts} className='brand__logo' alt='4435'></img>
                    <p className='brand__info'>Used Google Fonts for getting the majority of the fonts generated in the cards</p>
                    <a href='https://fonts.google.com/' target='_blank' rel="noreferrer">Google Fonts &rarr;	</a>
                </div>
                <div className='info__card flex__center__vert'>
                    <img src={Uigradients} className='brand__logo' alt='48743248'></img>
                    <p className='brand__info'>Used for cool gradients in the explore page of our website</p>
                    <a href='https://uigradients.com/' target='_blank' rel="noreferrer">Ui Gradients &rarr;</a>
                </div>
            </div>
            <div className='width__50__p__2half flex__center languages'>
                <h1>Supports all the languages..
                    <br></br>
                    So you can <span>Customize</span> ANYTHING, ANYTIME, ANYWHERE...
                </h1>
                <img src={IMG2} alt='image2'></img>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className='wave' viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,160L60,144C120,128,240,96,360,96C480,96,600,128,720,160C840,192,960,224,1080,213.3C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
    )
}
export default HomePage;
