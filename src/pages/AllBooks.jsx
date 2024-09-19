import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/books', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, []);
    
    return (
        <div>
            <h1 className='text-3xl text-black font-semibold mb-3'>Here are our books!</h1>
            <div className='flex flex-wrap items-start justify-center gap-6 p-5 overflow-x-auto'>
                {books &&
                    books.map((book) => (
                        <Card
                            book={book}
                            key={book.ID}
                        />
                    ))}
            </div>
        </div>
    );
};

export default AllBooks;
