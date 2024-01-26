import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getUserDTO, getApi } from "./Api";


const Navbar = () => {
    const [showUserSidebar, setShowUserSidebar] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("jwtToken");

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openProfile = () => {
        setShowUserSidebar(prev => !prev);
        setIsMobileMenuOpen(false);
    }

    const navigateTo = (page) => {
        navigate(page);
        setIsMobileMenuOpen(false);
        setShowUserSidebar(false);
    }

    const handleLogout = () => {
        setShowUserSidebar(false);
        localStorage.removeItem("jwtToken");
        window.location = "/login"
    }

    const handleCheckout = () => {
        fetch(getApi() + "/create/checkout/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(async (res) => {
            if (res.ok) {
                return res.json();
            } else {
                const json = await res.json();
                return await Promise.reject(json);
            }
        }).then(({ url }) => {
            window.location = url;
        }).catch((e) => {
            console.error(e.error)
        })
    }

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = showUserSidebar ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showUserSidebar]);

    useEffect(() => {
        getUserDTO(token)
        .then((data) => setUser(data))
    }, [token])

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
                    <li className="navLink" onClick={() => navigateTo("/")}>Home</li>
                    <li className="navLink" onClick={() => navigateTo("/text")}>TextGpt</li>
                    <li className="navLink" onClick={() => navigateTo("/image")}>ImageGenerator</li>
                    <li className="navLink" onClick={() => token ? openProfile() : navigateTo("/login")}>{token ? "Profile" : "Login"}</li>
                </ul>
            </div>


            <div className={`userSidebar ${showUserSidebar ? "open" : ""}`}>
                <div className="userInteractionContainer">
                    <div className="userInteractionHeader">
                        <h4>Welcome, {user && user.username}!</h4>
                        {user && user.premium && (
                            <span><ion-icon name="diamond-outline"></ion-icon></span>
                        )}  
                    </div>
                    
                    <div className="userButtonContainer">
                        {user && user.premium ? (
                            <button onClick={() => handleCheckout()}>Quit Membership</button>
                        ) : (
                            <button onClick={() => handleCheckout()}>Get Premium</button>
                        )}
                        
                        <button onClick={() => handleLogout()}>Logout</button>                        
                    </div>
                </div>
            </div>

            <nav className="mobileNavContainer">
                <ion-icon name="menu-outline" onClick={toggleMobileMenu}></ion-icon>
            </nav>
            <div className={`mobileMenu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ion-icon name="close-outline" onClick={toggleMobileMenu}></ion-icon>
                <ul className="navLinksMobile">
                    <li className="navLink" onClick={() => navigateTo("/")}>Home</li>
                    <li className="navLink" onClick={() => navigateTo("/text")}>TextGpt</li>
                    <li className="navLink" onClick={() => navigateTo("/image")}>ImageGenerator</li>
                    <li className="navLink" onClick={() => token ? openProfile() : navigateTo("/login")}>{token ? "Profile" : "Login"}</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;