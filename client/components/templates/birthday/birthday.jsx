import React, { useState } from 'react';
import '../../styles/templates/birthday.css'

const Birthday = ({ currentSlide }) => {

    const [imgError1, setImgError1] = useState(false);
    const [imgError2, setImgError2] = useState(false);

    const imgSrc1 = currentSlide?.text_02;
    const imgSrc2 = currentSlide?.text_03;


    return (
        <div className="display-birthday-container">
            <div className="display-birthday-box">
                <h1 className="display-birthday-title">{currentSlide?.text_01}</h1>
                <img alt="image/video"
                    src={imgSrc1}
                    className="display-birthday-imagePerson"
                    style={{ display: imgSrc1 && !imgError1 ? 'block' : 'none' }}
                    onError={() => setImgError1(true)}/>
                <h3 className="display-birthday-desc">{currentSlide?.text_04}</h3>
            </div>
        </div>
    )
}

export default Birthday;