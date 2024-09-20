import { useEffect, useState } from 'react';
import moment from 'moment';
import '../../styles/templates/video.css';

const Video = ({ currentSlide, onDurationFetched }) => {
    const [videoDuration, setVideoDuration] = useState(0);
    const videoLink = currentSlide?.text_01 ? `${currentSlide.text_01}?autoplay=1&controls=0&modestbranding=1` : '';

    useEffect(() => {
        const fetchVideoDuration = async () => {
            try {
                if (!videoLink) {
                    console.error('No video link provided.');
                    return;
                }

                const url = new URL(videoLink);
                const videoId = url.pathname.split('/').pop();

                if (!videoId) {
                    console.error('Invalid video link. No video ID found.');
                    return;
                }

                const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; 
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`);

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error fetching video duration:', response.status, response.statusText, errorResponse);
                    return;
                }

                const data = await response.json();

                if (!data.items || data.items.length === 0) {
                    console.error('No items found in the response.');
                    return;
                }

                const duration = data.items[0].contentDetails?.duration;
                if (!duration) {
                    console.error('No duration found in the content details.');
                    return;
                }

                const durationInSeconds = moment.duration(duration).asSeconds();
                setVideoDuration(durationInSeconds);
                console.log(`Fetched video duration: ${durationInSeconds} seconds`);
                onDurationFetched(durationInSeconds);
            } catch (error) {
                console.error('Error fetching video duration:', error);
            }
        };

        if (videoLink) {
            fetchVideoDuration();
        }
    }, [currentSlide, videoLink]);

    return (
        <div className="display-video-container">
            <div className='display-video-box'>
                {videoLink ? (
                    <iframe
                        className="display-video-player"
                        src={videoLink}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    >
                    </iframe>
                ) : (
                    <div>No video link provided</div>
                )}
            </div>
        </div>
    );
};

export default Video;