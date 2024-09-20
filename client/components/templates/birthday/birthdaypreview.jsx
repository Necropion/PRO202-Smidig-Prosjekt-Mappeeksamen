import '../../styles/templates/birthdaypreview.css';

const BirthdayPreview = ({ slideInfo }) => {
    return (
        <div className="preview-birthday-container">
            <div className="preview-birthday-box">
                <h1 className="preview-birthday-title">{slideInfo?.text_01}</h1>
                <div className="preview-birthday-content">
                    <img alt="image/video" src={slideInfo?.text_02} className="preview-birthday-imagePerson"/>
                    <p className="preview-birthday-desc">{slideInfo?.text_04}</p>
                </div>
            </div>
        </div>
    );
};

export default BirthdayPreview;