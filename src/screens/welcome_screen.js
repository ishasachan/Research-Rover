import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import coverImage from '../assets/images/cover.jpg';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userEmail = Cookies.get("email");
        if (userEmail) {
            navigate("/");
        }
    });

    return (
        <div className="relative min-h-screen">
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${coverImage})` }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="font-playfair font-semibold text-2xl sm:text-3xl lg:text-4xl">
                    Welcome to
                </h1>
                <h1 className="font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-primary mt-4">
                    Research Rover
                </h1>
                <p className="mt-4 text-poppins font-light text-lg text-center px-7 lg:w-96 lg:px">
                    If you are someone who searches for journal and research papers constantly,
                    then this is the perfect place for you.
                </p>
                <Link to={"/signup"} className="block px-7">
                    <button
                        className="mt-6 px-8 py-4 w-96 rounded-full bg-[#003559] text-white font-medium focus:outline-none"
                    >
                        Sign Up
                    </button>
                </Link>
                <Link to={"/login"}>
                    <button
                        className="mt-4 px-8 py-4 text-primary hover:underline focus:outline-none"
                    >
                        I Already Have an Account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomeScreen;
