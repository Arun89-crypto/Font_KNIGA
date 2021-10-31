import React, { useState } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks';
import Fonts from '../../../files/fonts.json';
import Close from '../../../images/close.png';
import Arrow from '../../../images/arrow.png';
import './SavedCard.css';
import firebase from 'firebase';
import db from '../../../Firebase';
import { useStateValue } from '../../StateProvider';


function SavedCards({ color, text, size, bold, family, font_id, cardId, hash, setDeletepopup }) {
    const [{ user }] = useStateValue();
    const [details, showDetails] = useState(false);

    const handleDelete = () => {
        var cards_data = db.collection("USERS_KNIGA").doc(user.email);
        cards_data.update({
            saved_cards: firebase.firestore.FieldValue.arrayRemove(hash)
        })
        setDeletepopup(true);
        setTimeout(() => {
            setDeletepopup(false);
        }, 1000)
    }
    return (
        <div className='saved__card flex__center' style={{ color: `${color.color}`, background: `${color.background}` }}>
            <p style={{ fontWeight: `${(bold) ? 'bold' : 'normal'}`, fontFamily: `${family}`, fontSize: `${size}px`, textAlign: "center" }}>{text}</p>
            <button className="button__secondry flex__center flex__center" onClick={() => showDetails(true)} id='button_toggle'>
                <img src={Arrow} alt='arrow' style={{ width: '30px', transform: 'rotate(270deg)' }}></img>
            </button>
            <button className="button__secondry flex__center " id='delete__button' onClick={() => handleDelete()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 48 48" ><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z" /><path fill="none" d="M0 0h48v48h-48z" /></svg>
            </button>
            {
                (details) ? (
                    <SavedCardDetails color={color} ftcolor={color.color} fontId={font_id - 1} size={size} showDetails={showDetails} bold={bold} />
                ) : ''
            }
        </div>
    )
}

const SavedCardDetails = ({ color, ftcolor, size, bold, fontId, showDetails }) => {
    const FontData = Fonts[parseInt(fontId)];
    return (
        <div className='details__saved__cards flex__center'>
            <div className='code__block flex__center'>
                <img src={Close} alt='iiii' width='30px' style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', filter: 'invert(1)' }} onClick={() => showDetails(false)}></img>
                <CopyBlock
                    language={'CSS'}
                    text={` ${FontData.import ? (`${FontData.import}`) : ('')}
.div {
    /*Add this code to the div*/
    background : ${color.background};
    /* width: 'Add your width here'*/
    /* height: 'Add your height here'*/
}
p{
    /*Add this code to the text class or id*/
    color : ${ftcolor}; 
    font-size : ${size}px;
    font-family : ${FontData.font_family};
    ${(bold) ? `font-weight:'bold';` : ''}
}`}
                    showLineNumbers={true}
                    theme={dracula}
                    wrapLines={true}
                    className="code__block__main"
                    codeBlock
                />
            </div>
        </div>
    )
}

export default SavedCards
