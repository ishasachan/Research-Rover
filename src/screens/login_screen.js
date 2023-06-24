import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userEmail = Cookies.get('email');
        if (userEmail) {
            navigate('/');
        }
    }, [navigate]);

    const generateOTP = async () => {
        setLoading(true);

        try {
            const url = 'https://research-rover.onrender.com/api/users/login';
            const body = JSON.stringify({ email });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (response.ok) {
                setOtpSent(true);
                alert('OTP sent successfully.');
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Failed to generate OTP', error);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async () => {
        setLoading(true);

        try {
            const url = 'https://research-rover.onrender.com/api/users/login';
            const body = JSON.stringify({ email, otp });

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (response.ok) {
                Cookies.set('email', email, { expires: 7 });
                Cookies.set('isLoggedIn', "true", { expires: 7 });
                alert('Login success.');
                navigate('/');
            } else {
                alert('Failed to login user. Please try again.');
            }
        } catch (error) {
            console.error('Failed to login user', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-full md:w-96">
                <img className="mx-auto mb-6" src={Logo} alt="Logo" height={150} width={150} />

                <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
                <p className="text-blueGray text-center mb-6">Login to your account</p>
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
                    <button
                        onClick={otpSent ? loginUser : generateOTP}
                        disabled={loading || !(email && (!otpSent || otp))}
                        className={`w-full ${(!email || (otpSent && !otp)) ? 'bg-gray-300' : 'bg-[#003559]'} text-white p-3 rounded-md font-medium`}
                    >
                        {loading ? 'Loading...' : (otpSent ? 'Verify OTP and Login' : 'Generate OTP')}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-700">
                        New here?{' '}
                        <Link to={"/signup"}>
                            <span className="text-blue-500 cursor-pointer">
                                Sign Up
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
