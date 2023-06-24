import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '../assets/images/logo.png';

const SingUpScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);

    useEffect(() => {
        const userEmail = Cookies.get("email");
        if (userEmail) {
            navigate("/");
        }
    });

    const generateOTP = async () => {
        setIsGeneratingOTP(true);

        const url = 'https://research-rover.onrender.com/api/users/register';
        const body = JSON.stringify({
            name: name,
            email: email,
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (response.ok) {
                setIsGeneratingOTP(false);
                setOtpSent(true);
                alert('OTP sent successfully.');
            } else {
                alert("Failed to generate OTP! Please Try again.");
                throw new Error('Failed to generate OTP');
            }
        } catch (error) {
            setIsGeneratingOTP(false);
            console.error('Failed to generate OTP', error);
        }
    };

    const registerUser = async () => {
        const url = 'https://research-rover.onrender.com/api/users/register';
        const body = JSON.stringify({
            name: name,
            email: email,
            otp: otp,
        });

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (response.ok) {
                alert('User registered successfully.');
                Cookies.set('email', email , { expires: 7 });
                Cookies.set('isLoggedIn', "true", { expires: 7 });
                navigate("/preferences");
            } else {
                alert("Failed to register user");
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Failed to register user', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-full md:w-96">
                <img className="mx-auto mb-6" src={Logo} alt="Logo" height={150} width={150} />

                <h1 className="text-2xl font-bold text-center mb-4">
                    Let's Get You On Board!
                </h1>
                <p className="text-blueGray text-center mb-6">
                    Create your account to get started
                </p>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md"
                    required
                />

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md"
                    required
                />

                {otpSent && (
                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md"
                        required
                    />
                )}

                <div className="flex justify-center">
                    {otpSent ? (
                        <button
                            onClick={registerUser}
                            style={{ backgroundColor: email && otp ? '#003559' : '#CCCCCC' }}
                            className="w-full text-white p-3 rounded-md font-medium"
                            disabled={!email || !otp}
                        >
                            Verify OTP and Sign Up
                        </button>
                    ) : (
                        <button
                            onClick={generateOTP}
                            disabled={isGeneratingOTP}
                            style={{ backgroundColor: email ? '#003559' : '#CCCCCC' }}
                            className={`w-full text-white p-3 rounded-md font-medium ${isGeneratingOTP && 'opacity-50 cursor-not-allowed'}`}
                        >
                            {isGeneratingOTP ? 'Generating OTP...' : 'Generate OTP'}
                        </button>
                    )}
                </div>


                <div className="mt-8 text-center">
                    <p className="text-gray-700">
                        Already a member?{' '}
                        <Link to={"/login"}>
                            <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
                                Login now
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingUpScreen;
