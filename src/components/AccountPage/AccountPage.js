import React, { useEffect, useState } from 'react'
import './AccountPage.css';
import SavedCards from './SavedCards/SavedCards';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router';
import { auth } from '../../Firebase';
import { actionTypes } from '../reducer';
import firebase from 'firebase';


function AccountPage() {
    const [{ user }, dispatch] = useStateValue();
    const [savedCards, setSavedCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletepopup, setDeletepopup] = useState(false);

    const emojis = ['🙏', '🥰', '😍', '🔥', '❤️', '✨', '🚀', '👨‍💻', '🎸'];
    let history = useHistory();
    const SignOut = () => {
        auth.signOut().then(
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            })
        );
        history.push('/');
    }
    function getData() {
        const data = firebase.firestore().collection("USERS_KNIGA");
        setLoading(true);
        data.onSnapshot((snapshot) => {
            let Items = [];
            snapshot.forEach((doc) => {
                if (doc.data().email === user.email) {
                    Items.push(doc.data().saved_cards);
                    console.log("yes");
                    setLoading(false);
                    // console.log(Items[0]);
                }
            })
            setSavedCards(Items[0]);
            console.log(savedCards);
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='account__page__master'>
            <nav className='account__nav flex__around'>
                <div>
                    <h1>{user.displayName} {emojis[Math.floor(Math.random() * 10) + 1]}</h1>
                    <p>{user.email}</p>
                </div>
                <button className='button__primary' onClick={SignOut}>Sign Out</button>
            </nav>
            <div className={(deletepopup) ? 'delete__popup delete__popup__up' : 'delete__popup'}>
                <p style={{ color: '#ff002b' }}>Card deleted successfully 🙂 !!</p>
            </div>
            <h3 className='saved__card__heading'>Saved Cards</h3>
            <div className='cards__section'>
                {
                    (loading) ? (<p>Loading....</p>) : (
                        (savedCards.length !== 0) ? (
                            savedCards.map((card) => {
                                // console.log(card);
                                const arr = card.split('|');
                                console.log(arr);
                                const colorObj = {
                                    color: arr[1],
                                    background: arr[2]
                                }
                                function generateId() {
                                    return Math.random().toString(36).substring(2) +
                                        (new Date()).getTime().toString(36);
                                }
                                return (
                                    <SavedCards deletepopup={deletepopup} setDeletepopup={setDeletepopup} cardId={generateId()} color={colorObj} text={arr[3]} size={arr[4]} bold={arr[5]} family={arr[6]} font_id={arr[7]} hash={card}></SavedCards>
                                )
                            })
                        ) : (<p style={{ width: '400px' }}>No cards saved !!</p>)
                    )

                }
            </div>

        </div>
    )
}


export default AccountPage;
