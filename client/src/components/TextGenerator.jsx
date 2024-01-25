import React, { Suspense, useState, useEffect } from "react";
import "./TextGenerator.css";
import { getApi } from "./Api";


const TextGenerator = () => {

    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");
    const [displayedOutput, setDisplayedOutput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplayedOutput("");
        
        fetch(getApi() + "/generate/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input: textInput })
        }).then((res) => res.json())
        .then((data) => {
            setTextOutput(data.reply.message.content)
            setTextInput("");
        })
    }

    useEffect(() => {

        let index = 0;

        const timer = setInterval(() => {
            setDisplayedOutput((prev) => prev + textOutput.charAt(index));
            index++;

            if (index === textOutput.length) {
                clearInterval(timer);
            }
        }, 40);
    
    
        return () => {
            clearTimeout(timer);
        };
    }, [textOutput]);


    return (
        <div className="TextGenerator">

            <div className="textOutputContainer">
                <p className="textOutput" value={displayedOutput}>{displayedOutput}</p>
            </div>
            <form className="textInputForm" onSubmit={handleSubmit}>
                <input 
                    placeholder="Type here..."
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="textInput"
                />
                <button type="submit"><ion-icon name="send-outline"></ion-icon></button>
            </form>
        </div>
    )
}

export default TextGenerator;