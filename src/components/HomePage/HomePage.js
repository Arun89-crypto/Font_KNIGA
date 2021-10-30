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
import Underline from "../../images/underline.svg"
import Group1 from '../../images/Group1.png';
import Group2 from '../../images/Group2.png';


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
            <div className=' flex__center__vert question'>
                <h1 id="question__heading">Why <span>FontKniga</span> ?</h1>
                <img src={Underline} alt="und" style={{ width: "500px" }} id="underline"></img>
                <br></br>
                <div className="question__div">
                    <img src={Group1} alt="grp1"></img>
                    <div className="flex__center">
                        <p className="feature__para">Here you can find the best fonts and best color combinations precisely matched and select from the wide range of cards and save them in your account</p>
                    </div>
                </div>
                <div className="question__div flex__reverse">
                    <img src={Group2} alt="grp2"></img>
                    <div className="flex__center">
                        <p className="feature__para">If you want to create your own you can create your own highly customizable theme within seconds and save that for further use...</p>
                    </div>
                </div>
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
        </div>
    )
}
export default HomePage;
