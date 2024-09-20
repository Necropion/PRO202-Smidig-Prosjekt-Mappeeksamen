import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../application.jsx";

/*
============================================================================================
PROTECTED ROUTES
-----------------
Dette verktøyet beskytter nettsiden og trigges hvis ikke brukeren er logget på.
Beskytter alle URLS som er wrapped med "Protected routes"
============================================================================================
*/ 

const ProtectedRoutes = () => {

    const { validation } = useContext(AppContext)

    return validation ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;