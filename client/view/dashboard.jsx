import React, {useState, useEffect, useContext} from 'react';
import { Container } from "../components/dashboard/container";
import { Templates } from "../components/dashboard/templates";
import {AppContext} from "../application";

/*
============================================================================================
DASHBOARD PAGE
-----------------
Denne siden åpner det valgte prosjektets slides og editor.
Dersom prosjektet ikke harslides, så viser den templates for at bruker skal velge og lage første slidedisplay.jsx.
I return, så er det en "IF-statement" som sjekker slidedisplay.jsx count til prosjektet
Editor renderes gjennom en container kalt "Dashboard Container" og templates gjennom "Templates"
Disse ligger i Utility mappen.
============================================================================================
*/ 

export function Dashboard() {
    const { currentProject, setCurrentProject, projectUpdated } = useContext(AppContext)

    const fetchProject = async () => {
        try {
            const project = await fetch("/api/project/" + window.sessionStorage.getItem("projectID"))
            const projectInfo = await project.json();

            if (!project.ok) {
                console.log(`Error when fetching current project info`)
            }

            if (project.ok) {
                setCurrentProject(projectInfo)
            }

        } catch (error) {
            console.log("Error in fetchProject: \n" + error)
        }
    }

    useEffect(() => {
        fetchProject();
        // Dependency will re-render on projectUpdated state change
    }, [projectUpdated]);

    return (
        <div className="dashboard-body">
            {currentProject === null ? (<div></div>) : // If currentProject is not fetched yet, show loading state
                // Conditional render statement based on how many slides a project has
                currentProject.slideCount > 0 ? (
                    // Passing fetched project data to the components
                    <Container />
                ) : (
                    // Passing the projectUpdated state setter, to trigger when a slidedisplay.jsx has been added and re-render
                    <Templates />
                )}
        </div>
    );
}