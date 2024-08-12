import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [link, setLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        if (!date && !time && !description && !link) {
            setErrorMessage('Please provide any data to change');
            return;
        }
        else if ((date && !time) || (!date && time)) {
            setErrorMessage('Please provide both date and time.');
            return;
        }
        const timer = date && time ? moment(`${date} ${time}`).format('YYYY-MM-DD HH:mm:ssZ') : '';

        const data = { description, timer, link };

        try {
            const response = await axios.put('http://localhost:8000/api/update-banner-details', data);
            if (response.data.success) {
                alert('Banner updated successfully!');
            } else {
                alert('Failed to update banner.');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
            alert('Error updating banner.');
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }, [errorMessage])

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

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Update Banner
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Dashboard;
