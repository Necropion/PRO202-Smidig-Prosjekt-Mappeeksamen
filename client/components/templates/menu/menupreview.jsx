import long_food from '../../../resources/images/food.png'
import '../../styles/templates/menupreview.css';

const MenuPreview = ({ slideInfo }) => {

    return (
        <div className="preview-menu-container">
            <div className='preview-menu-box'>
                <div className="preview-menu-content">
                    <h2>Today's menu</h2>
                    <div className="preview-menu-spacer"></div>
                    <span className="preview-menu-input"><h3>{slideInfo.text_01 ? slideInfo.text_01 : "Title 1"}</h3></span>
                    <div className="preview-menu-line"></div>
                    <span className="preview-menu-input">{slideInfo.text_02 ? slideInfo.text_02 : "Alternative 1"}</span>
                    <span className="preview-menu-input">{slideInfo.text_03 ? slideInfo.text_03 : "Alternative 2"}</span>
                    <span className="preview-menu-input">{slideInfo.text_04 ? slideInfo.text_04 : "Alternative 3"}</span>
                    <span className="preview-menu-input"><h3>{slideInfo.text_07 ? slideInfo.text_07 : "Title 2"}</h3></span>
                    <div className="preview-menu-line"></div>
                    <span className="preview-menu-input">{slideInfo.text_08 ? slideInfo.text_08 : "Alternative 1"}</span>
                    <span className="preview-menu-input">{slideInfo.text_09 ? slideInfo.text_09 : "Alternative 2"}</span>
                </div>
            </div>
            <div className="preview-menu-image-box">
                <img src={long_food} alt="food pic"/>
            </div>
        </div>
    )
}

export default MenuPreview;