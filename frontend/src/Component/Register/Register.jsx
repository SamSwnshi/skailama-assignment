import React, { useState, useContext } from 'react';
import homestyle from "./Signup.module.css";
import logo2 from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import api from "../../config/api";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    // const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        setLoading(true); 
        try {
            const response = await api.post("/api/register", { email, password });
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    const routeSignup = () => {
        navigate("/");
    };

    return (
        <div className={homestyle.container}>
            <div className={homestyle.right}>
                <img src={logo2} alt="Logo" className={homestyle.image2} />
                <p className={homestyle.intro}>Welcome to <br /><span className={homestyle.introQ}>Quest.AI</span></p>
                
                <form className={homestyle.formData} onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder='Email Address' 
                        className={homestyle.inputTag} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        className={homestyle.inputTag} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    
                    {error && <p className={homestyle.errorMessage}>{error}</p>}

                    <button type="submit" className={homestyle.button} disabled={loading}>
                        {loading ? <span className={homestyle.loader}></span> : "Register"}
                    </button>
                </form>

                <p className={homestyle.noAccount}>
                    Already have an account? <span className={homestyle.createAccount} onClick={routeSignup}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default Register;