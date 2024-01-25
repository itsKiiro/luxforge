import React, { useState, useEffect } from "react";
import "./HomeOverview.css";
import { useNavigate } from "react-router-dom";

const HomeOverview = () => {
    const inputValue = "Wiie funktioniert A.I. ?";
    const outputValue = "Küünstliche Intelligenz (A.I.) nutzt Algorithmen und maschinelles Lernen, um Muster in Daten zu erkennen und intelligente Entscheidungen zu treffen.";
    const [displayedInput, setDisplayedInput] = useState("");
    const [displayedOutput, setDisplayedOutput] = useState("");

    const navigate = useNavigate();
      
      
    useEffect(() => {
        const timerId = setTimeout(() => {
            let index = 0;
    
            const timer = setInterval(() => {
                setDisplayedInput((prev) => prev + inputValue.charAt(index));
                index++;
    
                if (index === inputValue.length) {
                    clearInterval(timer);
                }
            }, 70);
    
            return () => {
                clearInterval(timer);
            };
        }, 1000);
    
        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            let index = 0;
    
            const timer = setInterval(() => {
                setDisplayedOutput((prev) => prev + outputValue.charAt(index));
                index++;
    
                if (index === outputValue.length) {
                    clearInterval(timer);
                }
            }, 70);
    
            return () => {
                clearInterval(timer);
            };
        }, 5000);
    
        return () => {
            clearTimeout(timerId);
        };
    }, [outputValue]);
    
    

      

    return (
        <div className="HomeOverview">
            <div className="leftSideContainer">
                <div className="homeHeaderContainer">
                    <h1>LuxForge,</h1>
                    <h1>Your Simple A.I. Generator!</h1>
                    <div className="socialLinks">
                        <a href="https://linkedin.com/in/itsKiiro" target="_blank" className="socialLink"><ion-icon name="logo-linkedin"></ion-icon></a>
                        <a href="https://github.com/itsKiiro" target="_blank" className="socialLink"><ion-icon name="logo-github"></ion-icon></a>
                    </div>
                </div>
                <div className="homeButtonContainer">
                    <button onClick={() => navigate("/text")}><p>Try ChatBot</p> <ion-icon style={{ color: "black" }} name="arrow-forward-outline"></ion-icon></button>
                    <button onClick={() => navigate("/image")}><p>Try ImageGenerator</p> <ion-icon style={{ color: "black" }} name="arrow-forward-outline"></ion-icon></button>
                </div>
            </div>
            <div className="rightSideContainer">
                <div className="homeTextAnimationContainer">
                    <p>A.I. Bot: {displayedOutput}</p>
                </div>
                <input 
                    disabled={true}
                    value={displayedInput}
                />
            </div>
        </div>
    )
}

export default HomeOverview;