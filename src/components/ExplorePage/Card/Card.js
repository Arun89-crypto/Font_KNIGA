import React, { useState } from 'react';
import './Card.css';
import Close from '../../../images/close.png';
import { CopyBlock, dracula } from "react-code-blocks";
import Fonts from '../../../files/fonts.json';
import Arrow from '../../../images/arrow.png';
import db from '../../../Firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';
import SignIn from '../../../images/Signin.png'

function Card({ color, text, size, bold, family, fontId, userCard }) {
    const [{ user }] = useStateValue();
    const [popup, setPopup] = useState(false);
    const [savePopup, setSavePopup] = useState(false);
    //---------------------------------
    const card_id = 2;
    const string_update = `${card_id}|${color.color}|${color.background}|${text}|${size}|${bold}|${family}|${fontId}`;
    //---------------------------------
    const [details, setDetails] = useState(false);
    const handleSave = () => {
        var cards_data = db.collection("USERS_KNIGA").doc(user.email);
        cards_data.update({
            saved_cards: firebase.firestore.FieldValue.arrayUnion(string_update)
        })
        setSavePopup(true);
        setTimeout(() => {
            setSavePopup(false)
        }, 1000)
    }
    return (
        <div className="card flex__center" style={{ color: `${color.color}`, background: `${color.background}` }}>
            {/* <p>{color.id}/{fontId}</p> */}
            <p style={
                {
                    fontSize: `${size}px`,
                    fontWeight: (bold) ? (`bold`) : (`normal`),
                    fontFamily: `${family}`
                }
            }>{text}</p>
            <button className="button__secondry flex__center flex__center" onClick={() => setDetails(true)} id='button_toggle'>
                <img src={Arrow} alt='arrow' style={{ width: '30px', transform: 'rotate(270deg)' }}></img>
            </button>
            {
                (!userCard) ? (
                    <button className=" flex__center star__button" id='star__button' onClick={() => {
                        (user) ? (
                            handleSave()
                        ) : setPopup(true)
                    }}>
                        <p className='attachment'>{'Save 💾'}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#fff"><path d="M6 0v24l6-5.269 6 5.269v-24h-12zm8.473 13.8l-2.473-1.321-2.472 1.321.494-2.759-2.022-1.943 2.777-.383 1.223-2.523 1.223 2.522 2.777.384-2.021 1.943.494 2.759z" /></svg>
                    </button>
                ) : ''
            }
            {
                (details) ? (
                    <CardDetails setDetails={setDetails} text={text} size={size} color={color.background} ftcolor={color.color} family={family} bold={bold} Fonts={Fonts[fontId - 1]} details={details} />
                ) : ''
            }
            {
                (popup) ? (
                    <div className='pop__up flex__center'>
                        <div className='pop__up__main flex__center__vert'>
                            <h1 style={{ color: '#000' }}>Please Sign in to save your card !!</h1>
                            <img src={SignIn} width='300px' alt='iiuiui'></img>
                            <img src={Close} width='35px' style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setPopup(false)} alt='38479'></img>
                        </div>
                    </div>
                ) : ''
            }
            <div className={(savePopup) ? 'save__popup save__popup__up' : 'save__popup'}>
                <p style={{ color: '#06d6a0' }}>Card saved successfully 🙂 !!</p>
            </div>
        </div>
    )
}
const CardDetails = ({ setDetails, text, color, ftcolor, bold, size, Fonts }) => {
    const [tag, setTag] = useState(0);
    const TagReturn = (tag) => {
        if (tag === 0) {
            return <p style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</p>;
        } else if (tag === 1) {
            return <h1 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h1>;
        } else if (tag === 2) {
            return <h2 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h2>;
        } else if (tag === 3) {
            return <h3 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h3>;
        } else if (tag === 4) {
            return <h4 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h4>;
        } else if (tag === 5) {
            return <h5 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h5>;
        } else if (tag === 6) {
            return <h6 style={{
                fontFamily: `${Fonts.font_family}`,
                fontWeight: (bold) ? 'bold' : 'normal',
            }}>{text}</h6>;
        }
    }
    const Tag = (tag) => {
        if (tag === 0) {
            return 'p';
        } else if (tag === 1) {
            return 'h1';
        } else if (tag === 2) {
            return 'h2';
        } else if (tag === 3) {
            return 'h3';
        } else if (tag === 4) {
            return 'h4';
        } else if (tag === 5) {
            return 'h5';
        } else if (tag === 6) {
            return 'h6';
        }
    }
    console.log(Fonts);
    return (
        <div className="card_master flex__center">
            <div className="card__details transition_3s">
                <img src={Close} alt='closebtn' id='close__btn__details' onClick={() => setDetails(false)}></img>
                <h2>Code and Modifications</h2>
                <div className="width__full__pad_1 flex__around">
                    <div className="width__50__p__2half display__card" style={{ background: `${color}`, color: `${ftcolor}` }}>
                        {TagReturn(tag)}
                    </div>
                    <div className="width__50__p__2half">
                        <div className="tagbuttons">
                            <button style={{
                                background: (tag === 0) ? `black` : `none`,
                                color: (tag === 0) ? `white` : `black`,
                                fontWeight: (tag === 0) ? `bold` : `normal`
                            }} onClick={() => {
                                setTag(0);
                            }}>p</button>
                            <button style={{
                                background: (tag === 1) ? `black` : `none`,
                                color: (tag === 1) ? `white` : `black`,
                                fontWeight: (tag === 1) ? `bold` : `normal`
                            }} onClick={() => setTag(1)}>h1</button>
                            <button style={{
                                background: (tag === 2) ? `black` : `none`,
                                color: (tag === 2) ? `white` : `black`,
                                fontWeight: (tag === 2) ? `bold` : `normal`
                            }} onClick={() => setTag(2)}>h2</button>
                            <button style={{
                                background: (tag === 3) ? `black` : `none`,
                                color: (tag === 3) ? `white` : `black`,
                                fontWeight: (tag === 3) ? `bold` : `normal`
                            }} onClick={() => setTag(3)}>h3</button>
                            <button style={{
                                background: (tag === 4) ? `black` : `none`,
                                color: (tag === 4) ? `white` : `black`,
                                fontWeight: (tag === 4) ? `bold` : `normal`
                            }} onClick={() => setTag(4)}>h4</button>
                            <button style={{
                                background: (tag === 5) ? `black` : `none`,
                                color: (tag === 5) ? `white` : `black`,
                                fontWeight: (tag === 5) ? `bold` : `normal`
                            }} onClick={() => setTag(5)}>h5</button>
                            <button style={{
                                background: (tag === 6) ? `black` : `none`,
                                color: (tag === 6) ? `white` : `black`,
                                fontWeight: (tag === 6) ? `bold` : `normal`
                            }} onClick={() => setTag(6)}>h6</button>
                        </div>
                        <br></br>
                        <div className='code_window'>
                            <CopyBlock
                                language={'CSS'}
                                text={` ${Fonts.import ? (`${Fonts.import}`) : ('')}
.div {
    /*Add this code to the div*/
    background : ${color};
}
${Tag(tag)}{
    /*Add this code to the text class or id*/
    color : ${ftcolor}; 
    font-size : ${size}px;
    font-family : ${Fonts.font_family};
    ${(bold) ? `font-weight:'bold';` : ''}
}`}
                                showLineNumbers={true}
                                theme={dracula}
                                wrapLines={true}
                                codeBlock
                            />
                        </div>
                        <div className='hollow_text_section'>
                            <h2>Hollow Text</h2>
                            <CopyBlock
                                language={'CSS'}
                                text={` ${Tag(tag)} {
    /*Add this code to the text class or id*/
    /*Looks good in large size texts*/
  -webkit-text-stroke: 2px ${ftcolor};
  -webkit-text-fill-color: transparent;
}`}
                                showLineNumbers={true}
                                theme={dracula}
                                wrapLines={true}
                                codeBlock
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card
