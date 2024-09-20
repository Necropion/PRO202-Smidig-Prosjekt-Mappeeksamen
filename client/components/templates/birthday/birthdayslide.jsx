const BirthdaySlide = ({ currentSlide }) => {

    return (
        <div className="slides-birthday-container">
            <div className="slides-birthday-box">
                <h4 className="slides-birthday-title">{currentSlide ? currentSlide.text_01 : "Insert Birthday Title"}</h4>
                {currentSlide ? <img alt="image" src={currentSlide.text_02} className="slides-birthday-image-person"/> : <div className="slides-birthday-image-person">Insert Image</div>}
                <p className="slides-birthday-desc">{currentSlide ? currentSlide.text_04 : "Insert Description"}</p>
            </div>
        </div>
    )
}

export default BirthdaySlide;