import React, { useEffect, useState } from 'react';
import deliveryboy from '../assets/images/donate.jpg';
import dlogo from '../assets/images/find.png'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';


const ReceiverSignUp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        contact: '',
        email: '',
        password: ''
    });

    const signupReceiver = async (e) => {
        e.preventDefault();
        let { name, contact, email, password } = data;
        email = email.split(" ").join("");
        try {
            const { data } = await axios.post("/signupReceiver", {
                name, 
                contact,
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate("/");
                toast.success("SignUp Successful");
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
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#103cbe' }}>
                        <div className="featured-image m-2">
                            <img src={deliveryboy} className="img-fluid" style={{ width: '200px' }} alt="Featured" />
                        </div>
                        <p className="text-white fs-2 mt-4" style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}>Authentication</p>
                    </div>
                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4 mt-5 d-flex flex-column justify-content-center align-items-center">
                                <div className='d-flex justify-content-space-between align-items-center'>
                                    <h2 style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="m-3">Blood Receiver</h2>
                                    <img src={dlogo} className="img-fluid" style={{ width: '50px' }} alt="Featured" />
                                </div>
                                <p style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Receive Blood. Signup to continue.</p>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="contact" onChange={(e) => setData({ ...data, contact: e.target.value })} />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className="input-group mb-4">
                                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-primary w-100 fs-6" onClick={signupReceiver}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReceiverSignUp