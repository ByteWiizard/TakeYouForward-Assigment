import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const ChangePass = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('https://tuf-assignment-backend-rw56.onrender.com/api/change-password', {
                oldPassword,
                newPassword,
            });

            if (response.data.success) {
                alert('Password updated successfully!');
            } else {
                alert('Failed to update password.');
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error('Error updating password:', error);
                alert('Error updating password.');
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

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="mb-4 text-red-600 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                        Old Password
                    </label>
                    <input
                        id="oldPassword"
                        type={oldPasswordVisible ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Enter old password"
                    />
                    <button
                        type="button"
                        onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                        className="absolute inset-y-0 mt-6 right-0 flex justify-center items-center px-3 text-gray-600"
                    >
                        {oldPasswordVisible ? <Eye /> : <EyeOff />}
                    </button>
                </div>

                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type={newPasswordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Enter new password"
                    />
                    <button
                        type="button"
                        onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                        className="absolute inset-y-0 mt-6 right-0 flex justify-center items-center px-3 text-gray-600"
                    >
                        {newPasswordVisible ? <Eye /> : <EyeOff />}
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePass
