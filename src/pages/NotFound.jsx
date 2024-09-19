import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-lavender-4 to-cyan-500 gap-5 -mt-14'>

            <p className='text-2xl font-bold italic text-white'>
                The page you are looking for does not exist.
            </p>
            <Link
                as
                to={'/books'}
                className='bg-lavender-5 text-2xl font-bold text-white rounded-lg p-5 hover:text-white hover:bg-[#6c61d8] transition-all'
            >
                Back to exploring?{' '}
            </Link>
        </div>
    );
};

export default NotFound;