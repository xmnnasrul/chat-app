import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg';
import './csspages/Register.css';
import { loginRoute } from '../utils/APIRouters.js';
import { useNavigate } from 'react-router-dom';




function Login() {

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValid()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
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


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValid = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("Email and password is required !", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Email and password is required !", toastOptions);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }

    }, []);

    const [values, setValues] = useState({
        username: "",

        password: "",

    })




    return (
        <div className="Register">
            <form className='form' onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>Snappy</h1>
                </div>
                <input type="text" required placeholder='Username' min={3} name='username' onChange={(e) => handleChange(e)} />

                <input type="password" required placeholder='Password' name='password' onChange={(e) => handleChange(e)} />

                <button type='submit'>Login</button>
                <span>don`t have an account ? <a href="./Register"> Register</a></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;