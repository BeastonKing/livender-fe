import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/books/${Number(id)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                setBook(res.data.book);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (book) {
            axios
                .get(`http://localhost:8080/users/${book.UserID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then((res) => {
                    setSeller(res.data.user);
                })
                .catch((err) => console.log(err));
        }
    }, [book]);

    if (!book || !seller) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-4xl mx-auto'>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
                
                <div>
                    <img
                        src={book.Image}
                        alt={book.Title}
                        className='w-full h-auto object-cover rounded-lg shadow-md'
                    />
                </div>

                <div>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            {book.Title}
                        </h1>
                        <p className='text-xl text-gray-600 mt-2 italic'>
                            {book.Author}
                        </p>
                        <p className='text-2xl text-green-500 font-semibold mt-4'>
                            Rp{book.Price.toLocaleString()}
                        </p>
                        <button className='mt-2 bg-lavender-5 text-white py-2 px-4 rounded-lg shadow-md hover:bg-lavender-4 transition'>
                            Buy
                        </button>
                    </div>
                    <div className='text-start'>
                        <h2 className='text-xl font-bold text-gray-900 mt-10'>
                            More Info
                        </h2>
                        <ul className='text-gray-700'>
                            <li>
                                <span className='font-semibold'>Release Year: </span>{' '}
                                {book.ReleaseYear}
                            </li>
                            <li>
                                <span className='font-semibold'>Number of months since purchase: </span>{' '}
                                {book.Age} months
                            </li>
                            <li>
                                <span className='font-semibold'>Genres: </span>
                                {book.Genres.map((genre) => genre.Name).join(', ')}
                            </li>

                            <li className='mt-10'>
                                <span className='font-semibold'>Seller: </span>
                                {seller.Fullname}
                            </li>
                            <li>
                                <span className='font-semibold'>Posted on: </span>
                                {/* {new Date(book.CreatedAt).toLocaleString('id-ID')} */}
                                {new Date(book.CreatedAt).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ' at')}
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
