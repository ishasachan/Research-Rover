import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PreferencesScreen = () => {
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState(new Set());
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const isLoggedIn = Cookies.get("isLoggedIn");
        const userEmail = Cookies.get("email");
        if (!isLoggedIn || !userEmail) {
            navigate("/welcome");
        }
    }, []);

    const handleGenreSelection = (genreName) => {
        setSelectedGenres((prevGenres) => {
            const updatedGenres = new Set(prevGenres);
            if (updatedGenres.has(genreName)) {
                updatedGenres.delete(genreName);
            } else {
                updatedGenres.add(genreName);
            }
            return updatedGenres;
        });
    };

    const saveSelectedGenres = async () => {
        setLoading(true);
        const email = Cookies.get('email');
        const url = 'https://research-rover.onrender.com/api/users/preferences';
        const body = JSON.stringify({
            email: email,
            interests: Array.from(selectedGenres),
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
                setLoading(false);
                alert('Preferences Saved');
                navigate('/');
            } else {
                throw new Error('Failed to save preferences');
            }
        } catch (error) {
            setLoading(false);
            console.error('Failed to save preferences', error);
        }
    };

    const renderGenreButton = (genreName, index) => {
        const isSelected = selectedGenres.has(genreName);
    
        return (
            <div
                key={genreName}
                onClick={() => handleGenreSelection(genreName)}
                className={`cursor-pointer p-3 border-2 rounded-full ${isSelected ? 'bg-[#003559] text-white' : 'border-primary text-primary'
                    }`}
                style={{
                    margin: '0.1rem',
                    marginTop: index < 4 ? '1rem' : 0,
                    marginLeft: index % 4 === 1 ? '1rem' : 0,
                }}
            >
                {genreName}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-8 mx-auto mt-10 bg-white shadow-md rounded-md w-full md:w-96 lg:w-auto">
                <h1 className="text-2xl font-bold text-center mb-4">Preferences</h1>
                <div className="mb-6 text-center">
                    <p className="text-gray-500">Choose your interests</p>
                    <p className="text-gray-500">Select your preferred topics for recommendation</p>
                </div>

                <div className="flex flex-wrap justify-center mb-6">
                    {renderGenreButton('Transportation')}
                    {renderGenreButton('Computing and Processing')}
                    {renderGenreButton('Bioengineering')}
                    {renderGenreButton('Aerospace')}
                    {renderGenreButton('Engineering Profession')}
                    {renderGenreButton('Photonics and Electrooptics')}
                    {renderGenreButton('Geoscience')}
                    {renderGenreButton('Nuclear Engineering')}
                    {renderGenreButton('Components, Circuits, Devices and Systems')}
                    {renderGenreButton('Communication, Networking and Broadcast Technologies')}
                    {renderGenreButton('Signal Processing and Analysis')}
                    {renderGenreButton('Power, Energy and Industry Applications')}
                    {renderGenreButton('Fields, Waves and Electromagnetics')}
                    {renderGenreButton('General Topics for Engineers')}
                    {renderGenreButton('Robotics and Control Systems')}
                    {renderGenreButton('Engineered Materials, Dielectrics and Plasmas')}
                </div>



                <div className="flex justify-center">
                    <button
                        onClick={saveSelectedGenres}
                        disabled={loading}
                        className={`w-full bg-[#003559] text-white p-3 rounded-md font-medium ${loading && 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Saving...' : 'Get Started'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreferencesScreen;
