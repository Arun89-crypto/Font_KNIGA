import React, { useRef, useState } from 'react';
import './ExplorePage.css';
import Fonts from '../files/fonts.json';
import Cards from '../files/cards.json';

function ExplorePage() {
    const [text, setText] = useState('Text');
    const [font, setFont] = useState('Arial');
    const [size, setSize] = useState(25);
    return (
        <div className="main__container">
            <div className="left__container">
                <h1>Select Your Font</h1>
                <div className="font__toggle__container">
                    {
                        (Fonts.map((font) => {
                            const { id, name } = font;
                            return (
                                <div key={id} className="font__box" onClick={() => setFont(name)}>
                                    <h2 style={{ fontFamily: `${name}` }}>{name}</h2>
                                </div>
                            );
                        }))
                    }
                </div>
            </div>
            <div className="cards__container">
                <div className="input__container">
                    <input value={text} onChange={(e) => setText(e.target.value)}></input>
                    <div className="font__size">
                        <p>Font Size</p>
                        <input type="number" min="15" max="80" value={size} onChange={(e) => setSize(e.target.value)}></input>
                    </div>
                </div>
                <div className="cards">
                    {
                        (Cards.map((card) => {
                            const { id, background, color } = card;
                            return (
                                <div className="text__cards" key={id} style={{ color: `${color}`, background: `${background}` }} >
                                    <h3 style={{ fontFamily: `${font}`, fontSize: `${size}px` }}>{text}</h3>
                                    <div className="style__card">
                                        <p>
                                            <span>font-family: </span>{font};
                                            <br></br>
                                            <span>background: </span>{background};
                                            <br></br>
                                            <span>color: </span>{color};
                                            <br></br>
                                            <span>font-size: </span>{size}px;
                                        </p>
                                    </div>
                                </div>
                            );
                        }))
                    }
                </div>
            </div>
        </div >
    )
}

export default ExplorePage
