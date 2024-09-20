import React, { useContext, useEffect, useState } from 'react';
import "../components/styles/view/display.css";
import { AppContext } from "../application";
import Menu from "../components/templates/menu/menu";
import Birthday from "../components/templates/birthday/birthday";
import Video from '../components/templates/video/video';

export function Display() {
    const { displayProject, setDisplayProject } = useContext(AppContext);

    const [ws, setWs] = useState();
    const [projectName, setProjectName] = useState("");
    const [projectSlides, setProjectSlides] = useState([]);
    const [slideSwitch, setSlideSwitch] = useState(false);
    const [arrayIndex, setArrayIndex] = useState(0);
    const [prevProject, setPrevProject] = useState("");
    const [haveSlidesChanged, setHaveSlidesChanged] = useState(false);
    const [slideChange, setSlideChange] = useState(false);
    const [intervalDuration, setIntervalDuration] = useState(4000); // Shorter initial duration (For demonstration purposes)
    const [loading, setLoading] = useState(true);

    const DEFAULT_INTERVAL_DURATION = 10000; 

    const currentSlide = projectSlides[arrayIndex] || {};

    const fetchProject = async () => {
        if (!displayProject) {
            console.log("displayProject is undefined or null");
            return;
        }

        console.log("I was activated (fetchProject)");
        const getProject = await fetch(`/api/project/${displayProject}`);
        const newProject = await getProject.json();
        setProjectName(newProject.name);
    };

    const fetchProjectSlides = async () => {
        console.log("I was activated (fetchProjectSlides)");
        const getSlides = await fetch(`/api/slide/${displayProject}`);
        const newSlides = await getSlides.json();
        setProjectSlides(newSlides);
        setLoading(false); 
    };

    const slideRotation = async () => {
        if (prevProject !== displayProject) {
            setArrayIndex(-1);
            setPrevProject(displayProject);
            console.log("This shouldnt run when updating other projects that are not active");
            await fetchProject();
            await fetchProjectSlides();
        }

        if (prevProject === displayProject && slideChange !== haveSlidesChanged) {
            setArrayIndex(-1);
            setHaveSlidesChanged(slideChange);
            console.log("This shouldnt run when updating other projects that are not active");
            await fetchProjectSlides();
        }

        if (arrayIndex === (projectSlides.length - 1)) {
            setArrayIndex(0);
        } else {
            setArrayIndex(prev => prev + 1);
        }

        setSlideSwitch(prev => !prev);

        // Reset interval duration to default if current slide is the last video slide
        if (currentSlide.templateID === '666aa2e404584674c0049310' && arrayIndex === (projectSlides.length - 1)) {
            setIntervalDuration(DEFAULT_INTERVAL_DURATION);
        }
    };

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);
        ws.onmessage = (event) => {
            const serverResponse = JSON.parse(event.data);
            console.log(`displayProject: ${displayProject}, projectUpdated: ${serverResponse.projectUpdated}`);
            if (serverResponse.projectID !== null && serverResponse.projectID !== undefined) {
                setDisplayProject(serverResponse.projectID);
                console.log(`ProjectID Recieved: ${serverResponse.projectID}`);
            }
            if (serverResponse.slideChange !== null && serverResponse.projectUpdated === displayProject) {
                setSlideChange(prev => !prev);
                console.log(`Project Updated: ${serverResponse.projectUpdated}`);
            }
        };
        setWs(ws);
        const i = setInterval(() => {
            slideRotation();
        }, intervalDuration);

        console.log("Display Rendering Project: " + JSON.stringify(displayProject));
        return () => {
            console.log("Clearing Interval");
            clearInterval(i);
            ws.close();
        };
    }, [slideSwitch, slideChange, intervalDuration]);

    const handleVideoDurationFetched = (duration) => {
        console.log(`Setting interval duration to: ${duration * 1000} milliseconds`);
        if (currentSlide.templateID === '666aa2e404584674c0049310') {
            setIntervalDuration(duration * 1000); 
        }
    };

    const templateComponents = {
        "665625763da2eb37ed00af98": Menu,
        "665625813da2eb37ed00af9e": Birthday,
        "666aa2e404584674c0049310": (props) => <Video {...props} onDurationFetched={handleVideoDurationFetched} />
    };

    const TemplateComponent = templateComponents[currentSlide?.templateID];

    return (
        <div>
            {loading ? (
                <div className='loading-display'>Loading</div>
            ) : displayProject ? (
                TemplateComponent ? (
                    <TemplateComponent currentSlide={currentSlide} />
                ) : (
                    <div className='loading-display'>Loading</div>
                )
            ) : (
                <div className='inactive-display'>Please set active project...</div>
            )}
        </div>
    );
}