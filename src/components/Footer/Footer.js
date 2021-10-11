import React from 'react'
import BrandLogo from '../../images/logo1.png';
import { Link } from 'react-router-dom';
import './Footer.css'
import { useStateValue } from '../StateProvider';


function Footer() {
    const [{ user }] = useStateValue();

    return (
        <>
            <div className='flex__around width__full__pad_2half footer'>
                <div className='width__50__p__2half footer__left'>
                    <img src={BrandLogo} alt='logo' width='200px'></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie laoreet risus non vehicula. Pellentesque eget nibh massa. Morbi non vulputate lorem, in sollicitudin velit.</p>
                    <br></br>
                    <h3>Made with ☕ by ar_8creax9</h3>
                </div>
                <div className='width__50__p__2half flex__center__vert' style={{ alignItems: 'flex-end' }}>
                    <Link className="footer__link transition_3s" to='/exp'>
                        <p>Explore</p>
                    </Link>
                    <Link className="footer__link transition_3s" to='/custom'>
                        <p>Create Custom</p>
                    </Link>
                    {
                        (user) ? (

                            <Link className="footer__link transition_3s" to={`/account/${user.Aa}`}>
                                <p>Account</p>
                            </Link>
                        ) : ''
                    }
                </div>
            </div>
        </>
    )
}

export default Footer
