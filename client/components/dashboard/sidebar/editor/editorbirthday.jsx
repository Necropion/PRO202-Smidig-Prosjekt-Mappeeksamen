import React, {useState, useEffect, useContext} from 'react';
import '../../../styles/components/dashboard/sidebar/editor.css'
import '../../../styles/components/dashboard/sidebar/editorbirthday.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../../../application";

const EditorBirthday = () => {

    const { slideInfo, setSlideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject, setSlideUpdate } = useContext(AppContext);

    const navigate = useNavigate();
    const [ws, setWs] = useState();


    const [InputText_01, setInputText_01] = useState("");
    const [InputImage_01, setInputImage_01] = useState("");
    const [InputImage_02, setInputImage_02] = useState("");
    const [InputText_02, setInputText_02] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        let bodyContent = {}
        if (InputText_01) bodyContent.text_01 = InputText_01
        if (InputImage_01) bodyContent.text_02 = InputImage_01
        if (InputImage_02) bodyContent.text_03 = InputImage_02
        if (InputText_02) bodyContent.text_04 = InputText_02

        if (e.target.name === "Save") {
            const updateSlide = await fetch(`/api/slide/${slideInfo._id}`, {
                method: "PUT",
                body: JSON.stringify(bodyContent),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setDisplayChange(prev => !prev)
            setSlideUpdate(prev => !prev)
            await handleWS("Hi", currentProject._id)
            console.log("Data: " + slideInfo._id + " " + displayChange)
        } else if (e.target.name === "Display") {
            navigate("/Display")
        }
    };

    const backToSlides = async (e) => {
        e.preventDefault();

        setSlideSelected(prev => !prev)
    }

    const handleWS = async (event, event2) => {
        ws.send(JSON.stringify( { slideChange: event, projectUpdated: event2 } ));
    }

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setWs(ws)
    }, []);

    return (
        <div className="buttons">
            <form>
            <div className="type">Title:<input type="text" value={InputText_01} onChange={(e) => {
                    setInputText_01(e.target.value);
                    setSlideInfo(prev => ({...prev, text_01: e.target.value}))
                }} placeholder="Example: Birthday"/></div>
                <div className="alternative">Image 1:<input type="text" value={InputImage_01} onChange={(e) => {
                    setInputImage_01(e.target.value);
                    setSlideInfo(prev => ({...prev, text_02: e.target.value}))
                }} placeholder="Link to <image.jpg>"/></div>
                <div className="alternative-desc">Description:<textarea value={InputText_02} onChange={(e) => {
                    setInputText_02(e.target.value);
                    setSlideInfo(prev => ({...prev, text_04: e.target.value}))
                }}/></div>
                 <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
            </form>
        </div>
    )
}

export default EditorBirthday;