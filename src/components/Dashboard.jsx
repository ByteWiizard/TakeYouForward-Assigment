import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBanner } from '../redux/visibleReducer';
import { Eye, EyeOff } from 'lucide-react';



const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [link, setLink] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.banner.isVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        if (!password) {
            setErrorMessage('Please enter the password');
            return;
        }
        else if (!date && !time && !description && !link) {
            setErrorMessage('Please provide any data to change');
            return;
        }
        else if ((date && !time) || (!date && time)) {
            setErrorMessage('Please provide both date and time.');
            return;
        }
        const timer = date && time ? moment(`${date} ${time}`).format('YYYY-MM-DD HH:mm:ssZ') : '';

        const now = moment();
        if (timer && moment(timer).isBefore(now)) {
            setErrorMessage('The timer cannot be set to a past date and time.');
            return;
        }

        const data = { description, timer, link, password };

        try {
            const response = await axios.put('https://tuf-assignment-backend-rw56.onrender.com/api/update-banner-details', data);
            if (response.data.success) {
                alert('Banner updated successfully!');
            } else {
                alert('Failed to update banner.');
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error('Error updating banner:', error);
                alert('Error updating banner.');
            }
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }, [errorMessage])

    const handleToggle = () => {
        dispatch(toggleBanner());
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Banner Details</h1>
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="mb-4 text-red-600 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Enter banner description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                        Time
                    </label>
                    <input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
                        Link
                    </label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Enter banner link"
                    />
                </div>

                <div className="mb-6 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Enter Your Password
                    </label>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 mt-6 right-0 flex justify-center items-center px-3 text-gray-600"
                    >
                        {passwordVisible ? <Eye /> : <EyeOff />} {/* Use appropriate icons here */}
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Update Banner
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Show Banner</label>
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`w-full px-3 py-2 font-bold rounded-lg ${isVisible ? 'bg-green-500 text-white' : 'bg-red-600 text-gray-800'} hover:bg-green-600 transition duration-300`}
                    >
                        {isVisible ? 'ON' : 'OFF'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Dashboard;
