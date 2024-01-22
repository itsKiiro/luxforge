import React, { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();

    useEffect(() => {

    })


    return (
        <div className="Navbar">
            <div className="logoContainer">
                <div>
                    <h1>LuxForge</h1>
                </div>
                <div>
                    <h4></h4>
                </div>
            </div>
            <div className="navLinksContainer">
                <ul className="navLinks">
                    <li className="navLink" onClick={() => navigate("/")}>Home</li>
                    <li className="navLink" onClick={() => navigate("/text")}>TextGpt</li>
                    <li className="navLink" onClick={() => navigate("/image")}>ImageGenerator</li>
                    <li className="navLink">Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;