import React, {useContext} from 'react';
import '../../styles/components/dashboard/sidebar.css'
import {AppContext} from "../../../application.jsx";
import EditorMenu from "./editor/editormenu.jsx";
import EditorBirthday from "./editor/editorbirthday.jsx";
import EditorVideo from "./editor/editorvideo.jsx"

/*
============================================================================================
SIDEBAR EDITOR
-----------------
Dette er editor delen av DASHBOARD CONTAINER.
Her legges det opp Input fields hvor brukeren sender data inn. Denne dataen lagres i MongoDB.
Ved trykk av buttons, så vil funksjonen "setDisplayChange" trigges.
Denne funksjonen trigger useEffect i Slidepreview, som refresher Preview'en.
I bunn og grunn så får den preview'en til å laste inn på nytt igjen, med nyeste data.
(Hence hvorfor du ser 1 millisekund flimring når man gjør en update). 
(DETTE GÅR FINT! Brukeren får en feeling av at noe skjer.)
============================================================================================
*/

export function Sidebareditor() {
    const { slideInfo } = useContext(AppContext);

    const templateComponents = {
        "665625763da2eb37ed00af98": EditorMenu,
        "665625813da2eb37ed00af9e": EditorBirthday,
        "666aa2e404584674c0049310": EditorVideo
    }

    const TemplateComponent = templateComponents[slideInfo?.templateID]


    return (
        <div className="settings-sidebar">
            <TemplateComponent />
        </div>
    );
}