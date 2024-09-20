import React, {useState, useEffect, useContext} from 'react';
import '../../../styles/components/dashboard/sidebar/editor.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../../../application";

const EditorMenu = () => {

    const { slideInfo, setSlideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject, setSlideUpdate } = useContext(AppContext);

    const navigate = useNavigate();
    const [ws, setWs] = useState();

    // Inputs
    const [InputText_01, setInputText_01] = useState("");
    const [InputText_02, setInputText_02] = useState("");
    const [InputText_03, setInputText_03] = useState("");
    const [InputText_04, setInputText_04] = useState("");
    const [InputText_07, setInputText_07] = useState("");
    const [InputText_08, setInputText_08] = useState("");
    const [InputText_09, setInputText_09] = useState("");


    const handleUpdate = async (e) => {
        e.preventDefault();

        let bodyContent = {}
        if (InputText_01) bodyContent.text_01 = InputText_01
        if (InputText_02) bodyContent.text_02 = InputText_02
        if (InputText_03) bodyContent.text_03 = InputText_03
        if (InputText_04) bodyContent.text_04 = InputText_04
        if (InputText_07) bodyContent.text_07 = InputText_07
        if (InputText_08) bodyContent.text_08 = InputText_08
        if (InputText_09) bodyContent.text_09 = InputText_09

        if (e.target.name === "Save") {
            const updateSlide = await fetch(`/api/slide/${slideInfo._id}`, {
                method: "PUT",
                body: JSON.stringify(bodyContent),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const slideUpdate = await updateSlide.json();
            setDisplayChange(prev => !prev)
            setSlideUpdate(prev => !prev)
            await handleWS("Hi", currentProject._id)
            console.log("Data: " + slideInfo._id + " " + displayChange)
        } else if (e.target.name === "Display") {
            window.open('/display','_blank');
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
                <div className="type">Title 1:<input type="text" value={InputText_01} onChange={(e) => {
                    setInputText_01(e.target.value);
                    setSlideInfo(prev => ({...prev, text_01: e.target.value}))
                }} placeholder="Example: Food"/></div>
                <div className="alternative">Alternative 1:<input type="text" value={InputText_02} onChange={(e) => {
                    setInputText_02(e.target.value);
                    setSlideInfo(prev => ({...prev, text_02: e.target.value}))
                }} placeholder="Example: Tacos"/></div>
                <div className="alternative">Alternative 2:<input type="text" value={InputText_03} onChange={(e) => {
                    setInputText_03(e.target.value);
                    setSlideInfo(prev => ({...prev, text_03: e.target.value}))
                }} placeholder="Example: Burgers"/></div>
                <div className="alternative">Alternative 3:<input type="text" value={InputText_04} onChange={(e) => {
                    setInputText_04(e.target.value);
                    setSlideInfo(prev => ({...prev, text_04: e.target.value}))
                }} placeholder="Example: Pizza"/></div>
                <div className="type">Title 2:<input type="text" value={InputText_07} onChange={(e) => {
                    setInputText_07(e.target.value);
                    setSlideInfo(prev => ({...prev, text_07: e.target.value}))
                }} placeholder="Example: Drinks"/></div>
                <div className="alternative">Alternative 1:<input type="text" value={InputText_08} onChange={(e) => {
                    setInputText_08(e.target.value);
                    setSlideInfo(prev => ({...prev, text_08: e.target.value}))
                }} placeholder="Example: Coffee"/></div>
                <div className="alternative">Alternative 2:<input type="text" value={InputText_09} onChange={(e) => {
                    setInputText_09(e.target.value);
                    setSlideInfo(prev => ({...prev, text_09: e.target.value}))
                }} placeholder="Example: Coca Cola"/></div>
                <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
            </form>
        </div>
    )
}

export default EditorMenu;