import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // already logged in
            navigate('/explore');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user_id', Number(data.user_id))
                navigate('/explore');
            }
        })
        .catch(err => console.log(err));
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <div className='w-full h-full flex flex-col items-center justify-center bg-lavender-2'>
                <div className='bg-white rounded-lg shadow-lg p-8 w-[50rem]'>
                    <h2 className='text-2xl font-bold mb-4 text-lavender-5'>Login into Your Account</h2>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username' className='block text-sm font-medium text-gray-700 text-left'>
                                Username
                            </label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={username}
                                onChange={handleUsernameChange}
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 text-left'>
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={handlePasswordChange}
                                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                        </div>
                        <button type='submit' className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
                            Login
                        </button>
                    </form>
                    <p className='text-black mt-5 mb-0'>Don't have an account? <Link to={'/register'}>Register</Link> instead.</p>
                </div>
            </div>
        </>
    );
};

export default Login;