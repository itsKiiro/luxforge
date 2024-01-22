import React, { useState } from "react";
import "./ImageGenerator.css";
import { getApi } from "./Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGenerator = () => {

    const [imagePrompt, setImagePrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageModel, setImageModel] = useState("");
    const [imageSize, setImageSize] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        if (imageSize === "1024x1792" && imageModel !== "dall-e-3" || imageSize === "1792x1024" && imageModel !== "dall-e-3") {
            toast.error("Dall-E-3 Only");
            return;
        }

        setImageUrl("");

        const imageSettings = {
            input: imagePrompt,
            model: imageModel,
            size: imageSize
        }

        fetch(getApi() + "/generate/image", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(imageSettings)
        }).then((res) => res.json())
        .then((data) => {
            setImagePrompt("");
            setImageUrl(data.reply)
            toast.success("Image generated")
        })

    }


    return (
        <div className="ImageGenerator">

            <div className="imageSettingsContainer">
                <form className="imagePromptForm" onSubmit={handleSubmit}>
                    <div className="imageSettingContainer">
                        <input 
                            required
                            placeholder="Type here..."
                            type="text"
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            className="promptInput"
                        />
                    </div>
                    <div className="imageSettingContainer">
                        <div className="settingHeaderContainer">
                            <p>Model</p>
                        </div>
                        <div className="settingInputs">
                            <label onClick={() => setImageModel("dall-e-2")}>
                                <p>Dall - E 2</p>
                                <input type="radio" value="Dalle-2" name="model" />
                            </label>
                            <label onClick={() => setImageModel("dall-e-3")}>
                                <p>Dall - E 3 (Standard)</p>
                                <input type="radio" value="Dalle-3" name="model" />
                            </label>
                            <label  onClick={() => setImageModel("dall-e-3")}>
                                <p>Dall - E 3 (HD)</p>
                                <input type="radio" value="Dalle-3" name="model" />
                            </label>
                        </div>
                    </div>
                    <div className="imageSettingContainer">
                        <div className="settingHeaderContainer">
                            <p>Size</p>
                        </div>
                        <div className="settingInputs">
                            <label onClick={() => setImageSize("1024x1024")} >
                                <p>1024×1024</p>
                                <input type="radio" value="1024x1024" name="size" />
                            </label>
                            <label onClick={() => setImageSize("512x512")} >
                                <p>512×512</p>
                                <input type="radio" value="Dalle-2" name="size" />
                            </label>
                            <label onClick={() => setImageSize("256x256")} >
                                <p>256×256</p>
                                <input type="radio" value="Dalle-2" name="size" />
                            </label>
                            <label onClick={() => setImageSize("1024x1792")} >
                                <p>1024×1792 (Dall-E 3 only)</p>
                                <input type="radio" value="Dalle-3" name="size" />
                            </label>
                            <label onClick={() => setImageSize("1792x1024")} >
                                <p>1792×1024 (Dall-E 3 only)</p>
                                <input type="radio" value="Dalle-3" name="size" />
                            </label>
                        </div>
                    </div>
                    <div className="imageGptButton">
                        <button>Generate Image</button>
                    </div>
                </form>

                {imageUrl && (
                    <div className="saveImageButtons">
                        <button>Save Image</button>
                        <button>Show Full Image</button>
                    </div>
                )}
            </div>

            <div className="gptImageContainer">
                {imageUrl ? (
                    <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={imageUrl} alt="Generated Image" />
                ) : (
                    <div className="imagePlaceholderContainer">
                        <div>
                           <h2 style={{ textAlign: "center" }}>Your image will show up here</h2> 
                        </div>
                        <div className="arrowIcons">
                            <ion-icon name="caret-down-outline"></ion-icon>
                            <ion-icon name="caret-down-outline"></ion-icon>
                            <ion-icon name="caret-down-outline"></ion-icon>
                            <ion-icon name="caret-down-outline"></ion-icon>
                        </div>
                        
                    </div>
                )}
                

            </div>
            <ToastContainer />
        </div>
    )
}

export default ImageGenerator;