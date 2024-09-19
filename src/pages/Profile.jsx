import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const userId = Number(localStorage.getItem('user_id'));

    useEffect(() => {
        axios
            .get(`http://localhost:8080/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                setUser(res.data.user);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (user) {
            console.log(user);
            axios
                .get(`http://localhost:8080/books/user/${user.ID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then((res) => {
                    setBooks(res.data.books);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-3 min-h-screen p-6 bg-gray-50 flex flex-col items-center'>
            {user && (
                <h1 className='text-3xl text-black my-3'>
                    Hello,{' '}
                    <span className='text-lavender-4 font-bold'>
                        {user.Fullname}
                    </span>
                    !
                </h1>
            )}
            <h2 className='text-black mb-5 text-xl'>Here are your books: </h2>
            {books.length ? (
                <div className='flex flex-wrap items-start justify-center gap-6 p-5 overflow-x-auto'>
                    {books &&
                        books.map((book) => <Card book={book} key={book.ID} />)}
                </div>
            ) : (
                <h2 className='italic text-black'>
                    You haven't posted any books.
                </h2>
            )}
            <div className='bg-lavender-5 p-3 text-white text-xl font-semibold rounded-lg shadow-md flex flex-wrap items-center justify-center gap-2 w-fit'>
                <p>Want to sell your book?</p>
                <Link to={'/books/add'} className='w-fit text-2xl font-bold bg-white text-lavender-5 rounded-lg p-3 ml-3 my-4 hover:text-white hover:bg-lavender-4 transition-all'>
                    Sell Book
                </Link>
            </div>
        </div>
    );
};

export default Profile;
