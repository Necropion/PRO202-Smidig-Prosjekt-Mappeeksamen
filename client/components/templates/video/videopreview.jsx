import '../../styles/templates/videopreview.css'

const VideoPreview = ({ slideInfo }) => {

    console.log(slideInfo?.text_01)

    return (
        <div className="preview-video-container">
            <div className="preview-video-box">
                <iframe className="preview-video-player" src={slideInfo?.text_01}></iframe>
            </div>
        </div>
    )
}

export default VideoPreview;