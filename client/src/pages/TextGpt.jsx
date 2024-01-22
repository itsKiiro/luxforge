import React from "react";
import "./TextGpt.css";
import TextGenerator from "../components/TextGenerator";
import TextHistory from "../components/TextHistory";

const TextGpt = () => {


    return (
        <div className="TextGpt">
            <TextGenerator />
            <TextHistory />
        </div>
    )
}

export default TextGpt;