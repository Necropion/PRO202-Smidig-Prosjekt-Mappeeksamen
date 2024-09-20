import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/view/login.css';
import kpmg_logo from '../resources/images/kpmg_logo.png';
import { AppContext } from "../application.jsx";

/*
============================================================================================
LOG IN
-----------------
Autentifisering med bruk av passord.
Det kjøres en API til databasen for å sjekke om passordet stemmer.
============================================================================================
*/ 

export function Login() {
    const navigate = useNavigate();
    const { validation, setValidation } = useContext(AppContext)

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Enter password to continue");

    const loginPOST = async () => {

        try {
            const postCookies = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ validation }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(postCookies.ok) {
                console.log("Login cookies posted");
            }

            if (!postCookies.ok) {
                console.log(
                    `Error posting login cookies ${postCookies.status} ${postCookies.statusText}`
                )
            }
        } catch (error) {
            console.log(`Error in loginPOST: ${error}`);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const adminFetch = await fetch(`/api/login/${password}`)
            const adminValidation = await adminFetch.json();

            if (!adminFetch.ok) {
                console.log(
                    `Something went wrong while validating ${adminFetch.status} ${adminFetch.statusText}`
                )
            }

            if (adminFetch.ok) {
                console.log(`Validation: ${JSON.stringify(adminValidation.validation)}`)

                if (adminValidation.validation === "successful") {
                    setValidation(true)
                    console.log("Validation(2): " + validation)
                    await loginPOST()
                    setMessage(null)
                    navigate("/");
                }

                if (adminValidation.validation === "failed") {
                    setPassword("")
                    setMessage("Incorrect password, please try again")
                }
            };

        } catch (error) {
            console.log(`Error in loginPost ${error}`)
        }
    }

    return (
        <div className="container">
            <header className="header">
                <img src={kpmg_logo} alt="KPMG Logo" className="logo" />
                <h1 className="title">LIGHTBEAM</h1>
            </header>
            <main className="main-content">

                <div className="login-div">
                    <form action="" className="login-form" onSubmit={handleLogin}>
                        <h4 className="login-header">Sign in</h4>
                        <p className="login-info">{message}</p>
                        <input className="login-input" placeholder="Passord" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="login-btn">Enter</button>
                    </form>
                    <p className="login-trademark">SMIDIG PRO202 <b>SPRING 2024</b></p>
                </div>
            </main>
            <footer className="footer">
            </footer>
        </div>
    );
}