import long_food from '../../../resources/images/food.png'

const MenuSlide = ({ currentSlide }) => {

    return (
        <div className="slides-menu-container">
            <div className='slides-menu-box'>
                <div className="slides-menu-content">
                    <h2>Today's menu</h2>
                    <div className="slides-menu-spacer"></div>
                    <span className="slides-menu-input"><h3>{currentSlide ? currentSlide.text_01 : "Add Text"}</h3></span>
                    <div className="slides-menu-line"></div>
                    <span className="slides-menu-input">{currentSlide ? currentSlide.text_02 : "Add Text"}</span>
                    <span className="slides-menu-input">{currentSlide ? currentSlide.text_03 : "Add Text"}</span>
                    <span className="slides-menu-input">{currentSlide ? currentSlide.text_04 : "Add Text"}</span>
                    <span className="slides-menu-input"><h3>{currentSlide ? currentSlide.text_07 : "Add Text"}</h3></span>
                    <div className="slides-menu-line"></div>
                    <span className="slides-menu-input">{currentSlide ? currentSlide.text_08 : "Add Text"}</span>
                    <span className="slides-menu-input">{currentSlide ? currentSlide.text_09 : "Add Text"}</span>
                </div>
            </div>
            <div className="slides-menu-image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default MenuSlide;