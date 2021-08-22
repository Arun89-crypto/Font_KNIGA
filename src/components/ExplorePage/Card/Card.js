import React, { useState } from 'react';
import './Card.css';
import Close from '../../../images/close.png';
import { CopyBlock, googlecode } from "react-code-blocks";
import Fonts from '../../../files/fonts.json';
import Arrow from '../../../images/arrow.png';

function Card({ color, text, size, bold, family, fontId }) {
    const [details, setDetails] = useState(false);
    return (
        <div className="card flex__center" style={{ color: `${color.color}`, background: `${color.background}` }}>
            <p>{color.id}/{fontId}</p>
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
                (details) ? (
                    <CardDetails setDetails={setDetails} text={text} size={size} color={color.background} ftcolor={color.color} family={family} bold={bold} Fonts={Fonts[fontId - 1]} />
                ) : ''
            }
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
                                theme={googlecode}
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
                                theme={googlecode}
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
