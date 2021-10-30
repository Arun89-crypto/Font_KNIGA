import React, { useState, useEffect } from 'react'
import Fonts from '../../files/fonts.json';
import './CustomPage.css';
import Bold from '../../images/bold.png';
import Shadow from '../../images/shadow.png';
import Code from '../../images/code.png';
import Close from '../../images/close.png';
import AlignLeft from '../../images/text-align-left.png';
import AlignCenter from '../../images/text-align-center.png';
import AlignRight from '../../images/text-align-right.png';
import { useStateValue } from '../StateProvider';
import { CopyBlock, dracula } from "react-code-blocks";
import db, { auth, provider } from '../../Firebase';
import { actionTypes } from '../reducer';
import firebase from 'firebase';
import Lady from '../../images/lady.png';



import { ChromePicker } from 'react-color';

function CustomPage() {
    const [family, setFamily] = useState('Arial');
    const [size, setSize] = useState(25);
    const [color, setColor] = useState('#ffffff');
    const [fontColor, setFontColor] = useState('#000000');
    const [text, setText] = useState('Hello');
    const [bold, setBold] = useState(false);
    const [shadow, setShadow] = useState(true);
    const [showCode, setShowCode] = useState(false);
    const [textAlign, setTextAlign] = useState(1);
    const [fontId, setFontId] = useState(2);
    const [{ user }] = useStateValue();
    const [screen, setScreen] = useState(false);


    const calcScreen = () => {
        if (window.innerWidth < 760) {
            setScreen(true);
        } else {
            setScreen(false);
        }
    }

    useEffect(() => {
        calcScreen();
    }, [])
    return (
        <>
            {
                (!screen) ? (
                    <div className='custom__page__master'>
                        <div className="custom__page__dashboard">
                            <div className="custom__page__fonts">
                                {
                                    Fonts.map((font) => {
                                        return (
                                            <div className='transition_3s font__div' onClick={() => {
                                                setFamily(font.font_family);
                                                setFontId(font.id);
                                            }}>
                                                <p style={{ fontFamily: `${font.font_family}` }} > {font.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="card__division flex__around__vert">
                                {/* Card  */}
                                <input value={text} onChange={(e) => setText(e.target.value)}></input>
                                <div className="card__main__editable flex__center transition_5s" style={{
                                    background: `${color.hex}`,
                                    boxShadow: (shadow) ? `20px 20px 60px #bebebe, -20px -20px 60px #ffffff` : 'none',
                                    textAlign: (textAlign === 0) ? `left` : ((textAlign === 1) ? `center` : `right`)
                                }}>
                                    <p style={{ fontFamily: `${family}`, fontSize: `${size}px`, color: `${fontColor.hex}`, fontWeight: (bold) ? 'bold' : 'normal' }}>{text}</p>
                                </div>
                                <div className="flex__center">
                                    <button className='align__button flex__center' style={{
                                        filter: (textAlign === 0) ? 'invert(1)' : 'none'
                                    }} onClick={() => setTextAlign(0)}>
                                        <img src={AlignLeft} width='20px' alt='align left'></img>
                                    </button>
                                    <button className='align__button flex__center' style={{
                                        filter: (textAlign === 1) ? 'invert(1)' : 'none'
                                    }} onClick={() => setTextAlign(1)}>
                                        <img src={AlignCenter} width='20px' alt='align left'></img>
                                    </button>
                                    <button className='align__button flex__center' style={{
                                        filter: (textAlign === 2) ? 'invert(1)' : 'none'
                                    }} onClick={() => setTextAlign(2)}>
                                        <img src={AlignRight} width='20px' alt='align left'></img>
                                    </button>
                                </div>
                            </div>
                            <div className="color__division flex__center__vert">
                                {/* Modifier and colors */}
                                <div className="button__division flex__center">
                                    <button className='flex__center transition_3s' onClick={() => setBold(!bold)} style={{
                                        background: (bold) ? `black` : `white`,
                                    }}>
                                        <img src={Bold} alt="boldbutton" width='20px' style={{
                                            filter: (bold) ? `invert(1)` : 'none'
                                        }}></img>
                                    </button>
                                    <input type='number' className='flex__center' value={size} onChange={(e) => setSize(e.target.value)}></input>
                                    <button className='flex__center transition_3s' onClick={() => setShadow(!shadow)} style={{
                                        background: (shadow) ? `black` : `white`,
                                    }}>
                                        <img src={Shadow} alt="boldbutton" width='20px' style={{
                                            filter: (shadow) ? `invert(1)` : 'none'
                                        }}></img>
                                    </button>
                                </div>
                                <h2>Background Color</h2>
                                <ChromePicker color={color} onChange={updatedcolor => {
                                    setColor(updatedcolor);
                                }} className='color__picker' />
                                <h2>Font Color</h2>
                                <ChromePicker color={fontColor} onChange={updatedcolor => {
                                    setFontColor(updatedcolor);
                                }} className='color__picker' />
                            </div>
                        </div>
                        {
                            (showCode) ? (
                                <CodeDiv setShowCode={setShowCode} Fonts={Fonts[fontId - 1]} fontId={fontId} fontColor={fontColor} color={color} size={size} bold={bold} textAlign={textAlign} shadow={shadow} user={user} text={text} />
                            ) : ''
                        }
                        <button style={{
                            position: 'fixed',
                            bottom: '10px',
                            right: '10px',
                        }} className="flex__center button__primary transition_3s" onClick={() => setShowCode(true)}>
                            <img src={Code} alt='codebutton' width='40px' style={{ filter: "invert(1)" }}></img>
                            <h3 style={{ marginLeft: '10px' }}>Code</h3>
                        </button>
                    </div>
                ) : (
                    <div className="screen flex__center__vert">
                        <img src={Lady} alt="lady" style={{ width: "100%" }}></img>
                        <h2>Please use Desktop for better experience</h2>
                    </div>
                )
            }

        </>
    )
}

const CodeDiv = ({ setShowCode, Fonts, fontColor, color, size, bold, textAlign, shadow, text }) => {
    //---------------------------------
    const card_id = 2;
    const string_update = `${card_id}|${fontColor.hex}|${color.hex}|${text}|${size}|${bold}|${Fonts.font_family}|${Fonts.id}`;
    //---------------------------------
    const [{ user }, dispatch] = useStateValue();
    const [savePopup, setSavePopup] = useState(false);
    //sign in function
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message));
    }
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
        <div className="custom__page__code__master flex__center">
            {/* Code will be here */}
            <div className='custom__page__code flex__center'>
                <img className='close__btn__code' src={Close} alt='close button code' onClick={() => setShowCode(false)}></img>
                <div className="display">

                </div>
                <div>
                    <CopyBlock
                        language={'CSS'}
                        text={` ${Fonts.import ? (`${Fonts.import}`) : ('')}
.div {
    /*Add this code to the div*/
    background : ${color.hex};
}
p{
    /*Add this code to the text class or id*/
    color : ${fontColor.hex}; 
    font-size : ${size}px;
    font-family : ${Fonts.font_family};
    ${(bold) ? `font-weight:'bold';` : ''}
    ${(textAlign === 0) ? `text-align : 'left';` : `${(textAlign === 1) ? `text-align : 'center';` : `text-align : 'right';`}`}
    ${(shadow) ? ` /*Shadow only for white backgrounds*/
    box-shadow : 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;`: ``}
}`}
                        showLineNumbers={true}
                        theme={dracula}
                        wrapLines={true}
                        codeBlock
                    />
                </div>
                {
                    (user) ? (
                        <button className="button__primary flex__center" style={{ position: "absolute", bottom: "10px", right: "10px" }} onClick={() => handleSave()}>
                            <p style={{ marginRight: "5px" }}>Save Card</p>
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" fill="#fff" width="30px" height="30px"><path d="M20.71,9.29l-6-6a1,1,0,0,0-.32-.21A1.09,1.09,0,0,0,14,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10A1,1,0,0,0,20.71,9.29ZM9,5h4V7H9Zm6,14H9V16a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1Zm4-1a1,1,0,0,1-1,1H17V16a3,3,0,0,0-3-3H10a3,3,0,0,0-3,3v3H6a1,1,0,0,1-1-1V6A1,1,0,0,1,6,5H7V8A1,1,0,0,0,8,9h6a1,1,0,0,0,1-1V6.41l4,4Z" /></svg>
                        </button>) : <p style={{ position: "absolute", bottom: "10px", right: "10px", background: "#fff", padding: "10px", border: "1px solid black", borderRadius: "10px", cursor: "pointer" }} onClick={() => signIn()}>Sign In to save your Card</p>
                }
            </div>
            <div className={(savePopup) ? 'save__popup save__popup__up' : 'save__popup'}>
                <p style={{ color: '#06d6a0' }}>Card saved successfully 🙂 !!</p>
            </div>
        </div>
    )
}

export default CustomPage
