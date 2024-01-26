import React, { useEffect, useState } from "react";
import "./ImageGenerator.css";
import { getApi, getUserDTO } from "./Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGenerator = () => {

    const [imagePrompt, setImagePrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageModel, setImageModel] = useState("");
    const [imageSize, setImageSize] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        getUserDTO(token)
        .then((data) => setUser(data))
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (imageModel === "dall-e-3" && !token) {
            toast.error("Login To Use Dall-E-3!");
            return;
        }

        if (imageSize === "1024x1792" && user.premium === false || imageSize === "1792x1024" && user.premium === false) {
            toast.error("This size is for premium members only!")
            return;
        }

        if (imageSize === "1024x1792" && imageModel !== "dall-e-3" || imageSize === "1792x1024" && imageModel !== "dall-e-3") {
            toast.error("This size works with Dall-E-3 Only");
            return;
        }

        if (imageSize === "512x512" && imageModel === "dall-e-3" || imageSize === "256x256" && imageModel === "dall-e-3") {
            toast.error("This size works with Dall-E-2 Only");
            return;
        }

        setIsLoading(true);
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
            setImageUrl(data.reply);
            toast.success("Image generated");
        })
        .finally(() => {
            setIsLoading(false);
        })

    }

    const handleDownloadImage = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.target = '_blank';
            link.download = 'generated_image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            toast.error('No image to download. Generate an image first.');
        }
    };
    
    

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
                                <p>Dall - E 2 (Free)</p>
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
                                <p>1024×1024 (Standard)</p>
                                <input type="radio" value="1024x1024" name="size" />
                            </label>
                            <label onClick={() => setImageSize("512x512")} >
                                <p>512×512 (Dall-E 2 only)</p>
                                <input type="radio" value="Dalle-2" name="size" />
                            </label>
                            <label onClick={() => setImageSize("256x256")} >
                                <p>256×256 (Dall-E 2 only)</p>
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
                        <button 
                            style={{ cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? "0.7" : "1" }} 
                            disabled={isLoading}
                        >
                            {isLoading ? "loading..." : "Generate Image"}
                        </button>
                    </div>
                </form>

                {imageUrl && (
                    <div className="saveImageButtons">
                        <button onClick={handleDownloadImage}>Save Image</button>
                        <button onClick={handleDownloadImage}>Show Full Image</button>
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