import React, {useContext} from 'react';
import '../styles/components/dashboard/slidepreview.css';
import {AppContext} from "../../application";
import MenuPreview from "../templates/menu/menupreview";
import BirthdayPreview from "../templates/birthday/birthdaypreview";
import VideoPreview from '../templates/video/videopreview';

/*
============================================================================================
SLIDE PREVIEW inne i EDITOREN
-----------------
Dette er preview'en som er i dashboard containeren.
Denne siden er en "EMBEDDING" av /display siden. Ingen css påvirkning og kode.
Denne har basically bare limt inn display siden i en boks, slik at vi kan se den faktiske siden.
Denne preview'en refreshes for hver gang en bruker kjører en update i sidebar editoren.
Knappene i sidebar editoren trigger en displayChange, som refresher denne preview'en.
============================================================================================
*/  

export function Slidepreview() {
    const { slideInfo } = useContext(AppContext);

    const templateComponents = {
        "665625763da2eb37ed00af98": MenuPreview,
        "665625813da2eb37ed00af9e": BirthdayPreview,
        "666aa2e404584674c0049310": VideoPreview
    }

    const TemplateComponent = templateComponents[slideInfo?.templateID]

    return (
        <TemplateComponent slideInfo={ slideInfo } />
    );
}