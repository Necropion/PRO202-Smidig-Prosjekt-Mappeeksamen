const VideoSlide = ({ currentSlide }) => {

    let imgLink = "No Image"

    if (currentSlide?.text_01){
        const splitLink = currentSlide?.text_01.split('/')
        imgLink = `https://img.youtube.com/vi/${splitLink[4]}/hqdefault.jpg`
    }

    return (
        <div className="slides-video-container">
            <div className="slides-video-box">
                <img className="slides-video-thumbnail" src={imgLink}/>
            </div>
        </div>
    )
}

export default VideoSlide;