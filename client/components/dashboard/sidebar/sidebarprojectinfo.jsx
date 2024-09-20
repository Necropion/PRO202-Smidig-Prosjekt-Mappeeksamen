import React, { useContext, useEffect, useState } from 'react';
import '../../styles/components/dashboard/sidebar.css'
import { AppContext } from "../../../application";
import { useNavigate } from 'react-router-dom';

/*
============================================================================================
PROJECT INFO
-----------------
Bare en info side. ikke noe spess.
============================================================================================
*/

export function Sidebarprojectinfo() {
    const { currentProject, setShowBackButton, removeSlideClicked, setRemoveSlideClicked, addSlideClicked, setAddSlideClicked} = useContext(AppContext)

    const [ws, setWs] = useState();
    const navigate = useNavigate();


    const handleWS = async () => {

        if (ws) {
            ws.send(JSON.stringify({projectID: currentProject._id, slideID: null, displayChange: null}))
        }
    }

    const toggleAddSlide = async ()=>{
        if (removeSlideClicked){
            setRemoveSlideClicked(false)
        }
        setAddSlideClicked(prev => !prev);
        setShowBackButton(false);
    }
    const toggleRemoveSlide = async ()=>{
        if (addSlideClicked){
            setAddSlideClicked(false)
        }
        setRemoveSlideClicked(prev => !prev);
    }

    const handleUpdate = async (e) => {
            window.open('/display','_blank');
    };

    const backToProjects = async (e) => {
        e.preventDefault();

        setAddSlideClicked(false)
        navigate('/projects')
    }

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        setShowBackButton(true);
        setRemoveSlideClicked(false);
        setWs(ws)
    }, []);

    return (
        <div className="settings-sidebar">
            <h2>Project: {currentProject?.name}</h2>
            <h3>Slides: {currentProject?.slideCount}</h3>
            <div className="buttons">
            <button className="move-button" onClick={toggleAddSlide}>Add slide</button>
            {removeSlideClicked ? <button className="move-button" style={{background: "crimson"}} onClick={toggleRemoveSlide}>Remove slide</button> :
                <button className="move-button" onClick={toggleRemoveSlide}>Remove slide</button>}
                <button className="move-button" onClick={handleWS}>Set Active</button>
                <button className="move-button" name="Display" type="button" onClick={handleUpdate}>Open Display</button>
            <button className="move-button" onClick={backToProjects}>Back</button>
            </div>
        </div>
    );
}

