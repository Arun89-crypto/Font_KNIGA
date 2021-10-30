import React, { useEffect, useState } from 'react';
import './ExplorePage.css';
import Card from './Card/Card';
import GoToTop from '../Gototop';
//importing jsons
import Fonts from '../../files/fonts.json';
import Colors from '../../files/cards.json';

//importing images
import Font from '../../images/font.png';
import Bold from '../../images/bold.png';
import Close from '../../images/close.png';
import Plus from '../../images/plus.png';
import Minus from '../../images/minus.png';
import Lady from '../../images/lady.png';

function ExplorePage() {
    const [section, setSection] = useState(false);
    const [text, setText] = useState('Hello World');
    const [size, setSize] = useState(25);
    const [bold, setBold] = useState(false);
    const [family, setFamily] = useState('Arial');
    const [fontId, setFontId] = useState(2);
    const [cardType, setCardType] = useState(0);
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
                    <div>
                        <Navbar setSection={setSection} setBold={setBold} bold={bold} setCardType={setCardType} cardType={cardType} />
                        <HeaderSection size={size} setSize={setSize} text={text} setText={setText} />
                        <CardsSection text={text} size={size} bold={bold} family={family} fontId={fontId} cardType={cardType} />
                        <GoToTop />
                        {
                            (section) ? (
                                <FontsSection setSection={setSection} setFamily={setFamily} setFontId={setFontId} />
                            ) : ''
                        }
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
const FontsSection = ({ setSection, setFamily, setFontId }) => {
    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');
    const cancelSearchMode = (search) => {
        if (search === '') {
            setSearchMode(false);
        }
    }
    return (
        <div className='width__full__pad_2half font__section__master'>
            <div>
                <input placeholder='Search Fonts here' id='font__search__bar' value={search} onChange={(e) => {
                    setSearchMode(true);
                    setSearch(e.target.value);
                    cancelSearchMode(e.target.value);
                }}></input>
            </div>
            {
                (searchMode) ? (
                    <div className='fonts__section'>
                        {
                            Fonts.map((font) => {
                                if (font.name.toLowerCase().includes(search.toLowerCase())) {
                                    return (
                                        <div className='font__card transition_3s' onClick={() => {
                                            setFamily(font.font_family);
                                            setFontId(font.id);
                                            setSection(false);
                                        }}>
                                            <p style={{ fontFamily: `${font.font_family}` }} > {font.name}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                ) : (
                    <div className='fonts__section'>
                        {
                            Fonts.map((font) => {
                                return (
                                    <div className='font__card transition_3s' onClick={() => {
                                        setFamily(font.font_family);
                                        setFontId(font.id);
                                        setSection(false);
                                    }}>
                                        <p style={{ fontFamily: `${font.font_family}` }} > {font.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            {/* <div className='fonts__section'>
                {
                    Fonts.map((font) => {
                        return (
                            <div className='font__card transition_3s' onClick={() => {
                                setFamily(font.font_family);
                                setFontId(font.id);
                            }}>
                                <p style={{ fontFamily: `${font.font_family}` }} > {font.name}</p>
                            </div>
                        )
                    })
                }
            </div> */}
            <img src={Close} alt='close_button' width='30px' id='close__btn' onClick={() => setSection(false)}></img>
        </div>
    )
}
const Navbar = ({ setSection, setBold, bold, setCardType, cardType }) => {
    return (
        <nav className='width__full__pad_1 flex__around'>
            <div className='flex__center nav__link'>
                <p onClick={() => setCardType(0)} style={{ fontWeight: `${(cardType === 0) ? 'bold' : 'normal'}`, color: `${(cardType === 0) ? '#ef476f' : '#000'}` }}>All</p>
                <p onClick={() => setCardType(1)} style={{ fontWeight: `${(cardType === 1) ? 'bold' : 'normal'}`, color: `${(cardType === 1) ? '#ef476f' : '#000'}` }}>Flat Colors</p>
                <p onClick={() => setCardType(2)} style={{ fontWeight: `${(cardType === 2) ? 'bold' : 'normal'}`, color: `${(cardType === 2) ? '#ef476f' : '#000'}` }}>Gradient</p>
            </div>
            <div className='flex__center'>
                <button className='flex__around button__secondry' onClick={() => setSection(true)}>
                    <p style={{ marginRight: '10px' }}>Select Font</p>
                    <img src={Font} alt='font_button' width='20px'></img>
                </button>
                <button className='button__secondry flex__around' onClick={() => setBold(!bold)}>
                    <img src={Bold} alt='font_button' width='20px'></img>
                    {
                        (bold) ? (
                            <p style={{ color: '#118ab2', marginLeft: '10px' }}>On</p>
                        ) : (
                            <p style={{ color: 'red', marginLeft: '10px' }}>Off</p>
                        )
                    }
                </button>
            </div>
        </nav>
    )
}
const HeaderSection = ({ size, setSize, text, setText }) => {
    return (
        <div className='width__full__pad_2half flex__around'>
            <input value={text} onChange={(e) => setText(e.target.value)} id='input__text__card'></input>
            <div className='flex__center'>
                <button className='button__secondry' onClick={() => setSize(size - 1)}>
                    <img src={Minus} alt='plus' width='10px' ></img>
                </button>
                <input style={{ fontSize: '20px', margin: '10px', padding: '10px', width: '50px' }} value={size} onChange={(e) => setSize(e.target.value)} type='number' min="1" max="100"></input>
                <button className='button__secondry' onClick={() => setSize(size + 1)}>
                    <img src={Plus} alt='plus' width='10px' ></img>
                </button>
            </div>
        </div>
    )
}
const CardsSection = ({ text, size, bold, family, fontId, cardType }) => {
    return (
        <div className='width__full__pad_2half card__section__main flex__center'>
            {
                Colors.map((color) => {
                    if (cardType === 0) {
                        if (color.type === "flat" || color.type === "gradient") {
                            return (
                                <Card color={color} text={text} size={size} bold={bold} family={family} fontId={fontId} />
                            )
                        }
                    } else if (cardType === 1) {
                        if (color.type === "flat") {
                            return (
                                <Card color={color} text={text} size={size} bold={bold} family={family} fontId={fontId} />
                            )
                        }
                    } else if (cardType === 2) {
                        if (color.type === "gradient") {
                            return (
                                <Card color={color} text={text} size={size} bold={bold} family={family} fontId={fontId} />
                            )
                        }
                    }
                    // return (
                    // )
                })
            }
        </div>
    )
}
export default ExplorePage
