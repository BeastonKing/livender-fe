import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [seller, setSeller] = useState(null);

    const [isSeller, setIsSeller] = useState(false);

    const [isSold, setIsSold] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/books/${Number(id)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                setBook(res.data.book);
                if (res.data.book.IsSold === true) {
                    setIsSold(true);
                }
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
                    if (
                        book.UserID === Number(localStorage.getItem('user_id'))
                    ) {
                        setIsSeller(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [book]);

    if (!book || !seller) {
        return <div>Loading...</div>;
    }

    const handleBuy = () => {
        if (confirm('Are you sure you want to buy this book?')) {
            axios
                .post(
                    `http://localhost:8080/orders/purchase`,
                    {
                        user_id: Number(localStorage.getItem('user_id')),
                        book_id: Number(id),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.order) {
                        alert('Book purchased successfully!');
                        setIsSold(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
                <div className='flex md:justify-end'>
                    <img
                        src={book.Image}
                        alt={book.Title}
                        className='w-48 sm:w-56 md:w-72 h-auto object-cover rounded-lg shadow-2xl'
                    />
                </div>

                <div>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
                            {book.Title}
                        </h1>
                        <p className=' text-lg md:text-xl text-gray-600 mt-2 italic text-wrap'>
                            {book.Author}
                        </p>
                        <p className='text-2xl text-green-500 font-semibold mt-4'>
                            Rp{book.Price.toLocaleString()}
                        </p>
                        <div className='flex gap-3'>
                            {isSeller ? (
                                isSold ? (
                                    <h2 className='text-lg text-left italic text-red-500'>
                                        This book is already sold and thus can no
                                        longer be edited or removed.
                                    </h2>
                                ) : (
                                    <>
                                        <Link
                                            to={`/books/edit/${book.ID}`}
                                            className='mt-2 bg-[#ff6aa1] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#dc5b8b] hover:text-white transition'
                                        >
                                            Edit
                                        </Link>
                                        <button className='mt-2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition'>
                                            Delete
                                        </button>
                                    </>
                                )
                            ) : isSold ? (
                                <h2 className='text-lg italic text-red-500'>
                                    This book is sold.
                                </h2>
                            ) : (
                                <button
                                    onClick={handleBuy}
                                    className='mt-2 bg-lavender-5 text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#6c61d8] transition'
                                >
                                    Buy
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='text-start'>
                        <h2 className='text-xl font-bold text-gray-900 mt-10'>
                            More Info
                        </h2>
                        <ul className='text-gray-700'>
                            <li>
                                <span className='font-semibold'>
                                    Release Year:{' '}
                                </span>{' '}
                                {book.ReleaseYear}
                            </li>
                            <li>
                                <span className='font-semibold'>
                                    Number of months since purchase:{' '}
                                </span>{' '}
                                {book.Age} months
                            </li>
                            <li>
                                <span className='font-semibold'>Genres: </span>
                                {book.Genres.map((genre) => genre.Name).join(
                                    ', '
                                )}
                            </li>

                            <li className='mt-10'>
                                <span className='font-semibold'>Seller: </span>
                                {seller.Fullname}
                            </li>
                            <li>
                                <span className='font-semibold'>
                                    Posted on:{' '}
                                </span>
                                {new Date(book.CreatedAt)
                                    .toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    .replace(',', ' at')}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
