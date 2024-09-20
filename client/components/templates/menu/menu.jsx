import '../../styles/templates/menu.css'
import long_food from '../../../resources/images/food.png'

const Menu = ({ currentSlide }) => {

    return (
        <div className="display-menu-container">
            <div className='display-menu-box'>
                <div className="display-menu-content">
                    <h2>Today's menu</h2>
                    <div className="display-menu-spacer"></div>
                    <span className="display-menu-input"><h3>{currentSlide?.text_01}</h3></span>
                    <div className="display-menu-line"></div>
                    <span className="display-menu-input">{currentSlide?.text_02}</span>
                    <span className="display-menu-input">{currentSlide?.text_03}</span>
                    <span className="display-menu-input">{currentSlide?.text_04}</span>
                    <span className="display-menu-input"><h3>{currentSlide?.text_07}</h3></span>
                    <div className="display-menu-line"></div>
                    <span className="display-menu-input">{currentSlide?.text_08}</span>
                    <span className="display-menu-input">{currentSlide?.text_09}</span>
                </div>
            </div>
            <div className="display-menu-image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default Menu;