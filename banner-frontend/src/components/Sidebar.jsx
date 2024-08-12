import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Dynamic Banner</h2>
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Sidebar Links */}
            <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                <h2 className="hidden md:block text-xl font-bold pb-6">Dynamic Banner</h2>
                <ul>
                    <li className="mb-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "block py-2 px-4 font-semibold rounded hover:bg-gray-700 underline"
                                    : "block py-2 px-4 font-semibold rounded hover:bg-gray-700"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "block py-2 px-4 font-semibold rounded hover:bg-gray-700 underline"
                                    : "block py-2 px-4 font-semibold rounded hover:bg-gray-700"
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    {/* <li className="mb-2">
                        <NavLink
                            to="/change-password"
                            className={({ isActive }) =>
                                isActive
                                    ? "block py-2 px-4 font-semibold rounded hover:bg-gray-700 underline"
                                    : "block py-2 px-4 font-semibold rounded hover:bg-gray-700"
                            }
                        >
                            Password
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
