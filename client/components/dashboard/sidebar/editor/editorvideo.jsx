import React, { useState, useEffect, useContext } from 'react';
import '../../../styles/components/dashboard/sidebar/editor.css';
import '../../../styles/components/dashboard/sidebar/editorbirthday.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../../../application";

const EditorVideo = () => {
    const { slideInfo, setSlideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject, setSlideUpdate } = useContext(AppContext);

    const navigate = useNavigate();
    const [ws, setWs] = useState();
    const [InputVideo_01, setInputVideo_01] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        let bodyContent = {};
        if (InputVideo_01) bodyContent.text_01 = InputVideo_01;

        if (e.target.name === "Save") {
            const updateSlide = await fetch(`/api/slide/${slideInfo._id}`, {
                method: "PUT",
                body: JSON.stringify(bodyContent),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setDisplayChange(prev => !prev);
            setSlideUpdate(prev => !prev);
            await handleWS("Hi", currentProject._id);
            console.log("Data: " + slideInfo._id + " " + displayChange);
        } else if (e.target.name === "Display") {
            navigate("/Display");
        }
    };

    const backToSlides = async (e) => {
        e.preventDefault();
        setSlideSelected(prev => !prev);
    };

    const handleWS = async (event, event2) => {
        ws.send(JSON.stringify({ slideChange: event, projectUpdated: event2 }));
    };

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);
        ws.onmessage = (event) => {
            console.log(event.data);
        };
        setWs(ws);
    }, []);

    const formatYouTubeUrl = (url) => {
        let videoId = null;

        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return (
        <div className="buttons">
            <form>
                <div className="type">
                    Insert Youtube link:
                    <input
                        type="text"
                        value={InputVideo_01}
                        onChange={(e) => {
                            const inputValue = e.currentTarget.value;
                            const formattedUrl = formatYouTubeUrl(inputValue);
                            setInputVideo_01(formattedUrl);
                            setSlideInfo(prev => ({
                                ...prev,
                                text_01: formattedUrl
                            }));
                        }}
                        placeholder="https://www.youtube.com/..."
                    />
                </div>
                <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
            </form>
        </div>
    );
};

export default EditorVideo;
