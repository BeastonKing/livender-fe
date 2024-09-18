import React from 'react';
import { Outlet } from 'react-router-dom';

const Books = () => {
    return (
        <div className='p-0 md:px-6 md:py-8'>
            <Outlet />
        </div>
    );
};

export default Books;
