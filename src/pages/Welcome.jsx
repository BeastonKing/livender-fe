import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-lavender-4 to-cyan-500 gap-5 -mt-14'>
            <p className='text-4xl font-bold text-white'>
                Welcome to <span className='text-[#7064de]'>Livender</span>
            </p>
            <p className='text-2xl font-bold italic text-white'>
                Hub to <span className='text-[#7064de]'>sell</span> your <span className='text-[#7064de]'>books</span>
            </p>
            <Link
                as
                to={'/books'}
                className='bg-lavender-5 text-2xl font-bold text-white rounded-lg p-5 hover:text-white hover:bg-[#6c61d8] transition-all'
            >
                Start Exploring!{' '}
            </Link>
        </div>
    );
};

export default Welcome;
