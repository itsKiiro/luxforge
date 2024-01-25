import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApi } from "../components/Api";


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            toast.error("Password must equal confirmed password!")
            return;
        }

        const bodyData = {
            username: username,
            email: email,
            password: password
        }

        fetch(getApi() + "/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then((res) => {
            if (res.ok) {
                toast.success("User created!")                
                navigate("/login")
            } else {
                toast.error("Creating new User failed!")
            }
        })
        
    }

    return (
        <div className="SignUp">
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="loginHeaderContainer">
                    <h2>Sign Up</h2>
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
                        <p>Email</p>
                        <input 
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="loginInputContainer">
                        <p>Confirm password</p>
                        <input 
                            type="password"
                            required
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="loginButtonContainer">
                    <button type="submit">Sign Up</button>
                    <p onClick={() => navigate("/login")}>Already registered? Login!</p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SignUp;