import React, { useState } from 'react'
import Fonts from '../../files/fonts.json';
import './CustomPage.css';
import Bold from '../../images/bold.png';
import Shadow from '../../images/shadow.png';
import Code from '../../images/code.png';
import Close from '../../images/close.png';
import AlignLeft from '../../images/text-align-left.png';
import AlignCenter from '../../images/text-align-center.png';
import AlignRight from '../../images/text-align-right.png';
import { CopyBlock, googlecode } from "react-code-blocks";


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
    return (
        <div className='custom__page__master'>
            <div className="custom__page__dashboard">
                {/* This is a dashboard */}
                <div className="custom__page__fonts">
                    {
                        Fonts.map((font) => {
                            return (
                                <div className='transition_3s font__div' onClick={() => {
                                    setFamily(font.font_family);
                                    setFontId(font.id);
                                    console.log(font.id);
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
                        console.log(updatedcolor);
                    }} className='color__picker' />
                    <h2>Font Color</h2>
                    <ChromePicker color={fontColor} onChange={updatedcolor => {
                        setFontColor(updatedcolor);
                        console.log(updatedcolor);
                    }} className='color__picker' />
                </div>
            </div>
            {
                (showCode) ? (
                    <CodeDiv setShowCode={setShowCode} Fonts={Fonts[fontId - 1]} fontId={fontId} fontColor={fontColor} color={color} size={size} bold={bold} textAlign={textAlign} shadow={shadow} />
                ) : ''
            }
            <button style={{
                position: 'fixed',
                bottom: '0px',
                right: '0px',
            }} className="flex__center code__button transition_3s" onClick={() => setShowCode(true)}>
                <img src={Code} alt='codebutton' width='40px'></img>
                <h3 style={{ marginLeft: '10px' }}>Code</h3>
            </button>
        </div>
    )
}

const CodeDiv = ({ setShowCode, Fonts, fontColor, color, size, bold, textAlign, shadow }) => {
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
                        theme={googlecode}
                        wrapLines={true}
                        codeBlock
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomPage
