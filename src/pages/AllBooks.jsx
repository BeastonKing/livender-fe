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
                console.log(res.data.books);
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, []);
    
    return (
        <div>
            <h1>Here are our books!</h1>
            <div className='flex flex-wrap mx-10 px-10 gap-3'>
                {books &&
                    books.map((book) => (
                        <Card
                            title={book.Title}
                            author={book.Author}
                            year={book.Year}
                            price={book.Price ?? 0}
                            genres={book.Genres}
                        />
                    ))}
            </div>
        </div>
    );
};

export default AllBooks;
