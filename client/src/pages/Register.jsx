import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg';
import './csspages/Register.css';
import { registerRoute } from '../utils/APIRouters.js';
import { useNavigate } from 'react-router-dom';



function Register() {

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValid()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate("/");
            }
        }
    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 7500,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/')
        }
    }, [])


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValid = () => {
        const { password, confrimpassword, username, email } = values;
        if (password !== confrimpassword) {
            toast.error("Password and confrim password should be same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters !", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters !", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required ! ", toastOptions)
            return false
        }
        return true;
    };
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confrimpassword: ""
    })




    return (
        <div className="Register">
            <form className='form' onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>Snappy</h1>
                </div>
                <input type="text" required placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                <input type="password" required placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                <input type="password" required placeholder='Confrim Password' name='confrimpassword' onChange={(e) => handleChange(e)} />
                <button type='submit'>Create User</button>
                <span>Already have an account ? <a href="./Login"> Login</a></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register;