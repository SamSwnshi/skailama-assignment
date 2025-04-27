/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import homestyle from "./Home.module.css";
import masked from "../../assets/Mask group.png";
import logo from "../../assets/QuesLogo 1.png"
import logo2 from "../../assets/logo.png";
import google from "../../assets/google.png";
import api from "../../config/api";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    // const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); 

        try {
            const response = await api.post("/api/login", { email, password });
            localStorage.setItem("token", response.data.token);
            console.log('Login successful:', response.data);
            alert('Login successful!');
            setUser(response.data.user);
            navigate("/projects");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    const routeSignup = () => {
        navigate("/signup");
    };

    return (
        <div className={homestyle.container}>
            <div className={homestyle.left}>
                <div className={homestyle.imageContainer}>
                    <img src={masked} alt="Masked overlay" className={homestyle.maskedImage} />
                </div>
                <div className={homestyle.data}>
                    <img src={logo} alt="logo" className={homestyle.logo} />
                    <div className={homestyle.newData}>

                   
                    <p className={homestyle.details}>Your podcast <br />
                        will no longer<br />
                        be just a hobby
                    </p>
                    <p className={homestyle.subtitle}>Supercharge Your Distribution <br />
                        using your AI assistant!
                    </p>
                    </div>
                </div>
            </div>
            <div className={homestyle.right}>
                <img src={logo2} alt="Logo" className={homestyle.image2} />
                <p className={homestyle.intro}>Welcome to <br /><span className={homestyle.introQ}>Quest.AI</span></p>

                <form className={homestyle.formData}>
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className={homestyle.inputTag} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={homestyle.inputTag} 
                    />
                    <div className={homestyle.inputCheckboxDiv}>
                        <label className={homestyle.checkboxlabel}>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <p className={homestyle.forgot}>Forgot Password?</p>
                    </div>

                  
                    <button 
                        className={homestyle.button} 
                        onClick={handleLogin} 
                        disabled={loading} 
                    >
                        {loading ? <span className={homestyle.loader}></span> : "Login"}
                    </button>
                </form>

                <div className={homestyle.googleDiv}>
                    <img src={google} alt="" className={homestyle.googleImg} />
                    <p className={homestyle.googleName}>Continue with Google</p>
                </div>
                <p className={homestyle.noAccount}>
                    Don’t have an account? <span className={homestyle.createAccount} onClick={routeSignup}>Create Account</span>
                </p>
            </div>
        </div>
    );
};

export default Home;