import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileAvatar from '../assets/default-avatar.png';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className='bg-lavender-5 p-4 sticky top-0 px-10 w-full z-50'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex space-x-4'>
                    <Link to='/' className='text-white text-lg hover:text-purple-800'>
                        Home
                    </Link>
                    <Link to='/genres' className='text-white text-lg hover:text-purple-800'>
                        Genres
                    </Link>
                    <Link to='/books' className='text-white text-lg hover:text-purple-800'>
                        Explore Books
                    </Link>
                </div>

                <div className='relative'>

                    <div className='font-bold text-white text-xl'>
                        {localStorage.getItem('token') ? (
                            <>
                                <p onClick={toggleDropdown} className='cursor-pointer'>Menu<span>&#x25BE;</span></p>
                            </>
                        ) : (
                            <Link to='/login' className='text-white text-lg hover:text-purple-800'>
                                Sign In
                            </Link>
                        )}
                        


                    </div>
                    
                    {/* Dropdown menu */}
                    {dropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10'
                        >
                            <Link
                                to='/profile'
                                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                            >
                                Profile
                            </Link>
                            <Link
                                to='/orders'
                                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                            >
                                Orders
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user_id');
                                    window.location.href = '/login'; // Redirect to login after logout
                                }}
                                className='w-full bg-white block px-4 py-2 text-gray-700 hover:bg-red-300 hover:border-none'
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
