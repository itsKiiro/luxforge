import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { getApi } from "../components/Api";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        const bodyData = {
            username: username,
            password: password
        }

        fetch(getApi() + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwtToken", data.token);
                window.location = "/";
            } else {
                toast.error(data)
            }
        })
    }


    return (
        <div className="Login">
            <form className="loginForm" onSubmit={handleLogin}>
                <div className="loginHeaderContainer">
                    <h2>Login</h2>
                </div>
                <div className="loginInputsContainer">
                    <div className="loginInputContainer">
                        <p>Username</p>
                        <input 
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="loginInputContainer">
                        <p>Password</p>
                        <input 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="loginButtonContainer">
                    <button type="submit">Login</button>
                    <p onClick={() => navigate("/sign-up")}>Don't have an Account? Sign up here!</p>
                </div>
            </form>
        </div>
    )
}


export default Login;