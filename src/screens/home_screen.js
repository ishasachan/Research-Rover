import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [dayController, setDayController] = useState('');
  const [timeController, setTimeController] = useState('');
  const [isEditingTime, setIsEditingTime] = useState(false); // Track time editing state
  const [loading, setLoading] = useState(true);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const userEmail = Cookies.get('email');
    if (!isLoggedIn || !userEmail) {
      navigate('/welcome');
    } else {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const userEmail = Cookies.get('email');
      setEmail(userEmail);
      const response = await axios.get(`https://research-rover.onrender.com/api/users/${userEmail}`);
      console.log('Response:', response);
      const { user } = response.data;
      const interestNames = user.interests.map((interest) => interest.name);
      setName(user.name);
      setEmail(user.email);
      setInterests(interestNames);
      setDay(user.emailDay);
      setTime(user.emailTime);
      setDayController(user.emailDay);
      setTimeController(user.emailTime);
      console.log(dayController);
      console.log(timeController);
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async () => {
    try {
      const userEmail = Cookies.get('email');
      const response = await axios.put(
        `https://research-rover.onrender.com/api/users/preferences/${userEmail}`,
        {
          day: dayController,
          time: timeController,
        }
      );

      if (response.status === 200) {
        alert('Day and time updated successfully.');
      } else {
        alert('Failed to update day and time. Please try again.');
      }
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const handleTimeEdit = () => {
    setIsEditingTime(true);
  };

  const handleTimeChange = (e) => {
    setTimeController(e.target.value);
  };

  const handleTimeSave = () => {
    setIsEditingTime(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-md w-full md:w-96">
          <div className="text-2xl font-bold text-center mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6 px-4 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Research Rover</h1>
          <button
            className="text-white bg-[#003559] px-4 py-2 rounded-md"
            onClick={() => {
              Cookies.remove('email');
              Cookies.remove('isLoggedIn');
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Name: {name}</h2>
            <h2 className="text-2xl font-bold mb-2">Email: {email}</h2>
            <h2 className="text-2xl font-bold mb-2">Interests:</h2>
            <ul className="list-disc pl-8">
              {interests.map((interest, index) => (
                <li key={index} className="text-lg">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <button
              className="bg-[#003559] text-white px-4 py-2 rounded-md"
              onClick={() => navigate('/preferences')}
            >
              Update Preferences
            </button>
          </div>
          <div className="mb-8">
            <label className="block text-xl font-bold mb-2">Day:</label>
            <select
              className="border-2 border-gray-300 p-2 rounded-md w-full"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label className="block text-xl font-bold mb-2">Time:</label>
            {isEditingTime ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={timeController}
                  onChange={handleTimeChange}
                  className="border-2 border-gray-300 p-2 rounded-md flex-grow mr-2"
                />
                <button
                  className="bg-[#003559] text-white px-4 py-2 rounded-md"
                  onClick={handleTimeSave}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  value={time}
                  className="border-2 border-gray-300 p-2 rounded-md flex-grow mr-2"
                  readOnly
                />
                <button
                  className="bg-[#003559] text-white px-4 py-2 rounded-md"
                  onClick={handleTimeEdit}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              className="bg-[#003559] text-white px-4 py-2 rounded-md"
              onClick={updatePreferences}
            >
              Update Email Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;