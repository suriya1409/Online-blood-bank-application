import React, { useEffect, useState } from 'react';
import deliveryboy from '../assets/images/donate.jpg';
import dlogo from '../assets/images/find.png'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import ReceiverSignIn from './ReceiverSignIn';
import DonarSignIn from './DonarSignIn';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [user, setUser] = useState('receiver');

    const loginReceiver = async (e) => {
        e.preventDefault();
        let { email, password } = data;
        email = email.split(" ").join("");
        try {
            const { data } = await axios.post("/loginUser", {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate("/starter");
                localStorage.setItem("userData", JSON.stringify(data));
                toast.success("Login Successful");
                setTimeout(() => {
                    window.location.reload();
                }, 400);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred, please try again...");
        }
    };

    const loginDonar = async (e) => {
        e.preventDefault();
        let { email, password } = data;
        email = email.split(" ").join("");
        try {
            const { data } = await axios.post("/loginDonar", {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate("/donar");
                localStorage.setItem("userData", JSON.stringify(data));
                toast.success("Login Successful");
                setTimeout(() => {
                    window.location.reload();
                }, 400);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred, please try again...");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-3 border rounded-5 bg-light">
                <button className="btn btn-outline-primary w-48 fs-6 m-3" onClick={() => setUser('donar')}>Donor</button>
                <button className="btn btn-outline-primary w-48 fs-6 m-3" onClick={() => setUser('receiver')}>Receiver</button>
            </div>
            <div>
                {
                    user == "receiver" ? (
                        <ReceiverSignIn />
                    ) : (
                        <DonarSignIn />
                    )
                }
            </div>
        </>

    );
}

export default Login;