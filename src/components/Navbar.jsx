// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import profileAvatar from '../assets/default-avatar.png'  

const Navbar = () => {
    return (
        <nav className='bg-lavender-5 p-4 sticky top-0 mb-3 px-10 w-full'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* Left section: Home and Explore */}
                <div className='flex space-x-4'>
                    <Link to='/' className='text-white text-lg hover:text-purple-800'>
                        Home
                    </Link>
                    <Link to='/explore' className='text-white text-lg hover:text-purple-800'>
                        Explore
                    </Link>
                </div>

                {/* Right section: Profile Avatar */}
                <div className='flex items-center space-x-4'>
                    <Link to={'/profile'}>
                        <img
                            src={profileAvatar}
                            alt='Profile Avatar'
                            className='w-10 h-10 rounded-full object-cover border-2 border-purple-600'
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
