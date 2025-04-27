import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';
const Userauth = ({ children }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
        if (!user) {
            navigate("/")
        }
    }, [token, user, navigate])
    if (!token || !user) {
        return null; 
    }
    return (
        <>
            {children}
        </>
    )
}

export default Userauth