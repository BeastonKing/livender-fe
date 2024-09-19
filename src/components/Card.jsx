import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ book }) => {
    return (
        <Link to={`/books/${book.ID}`}>
            <div className='flex flex-col bg-white rounded-lg shadow-lg w-60 text-left hover:scale-105 transition-all'>
                <img
                    src={book.Image} // Assuming book.Image is the URL of the book cover
                    alt={book.Title}
                    className='w-full h-64 object-cover rounded-t-lg'
                />
                <div className='flex flex-col p-4'>
                    <h2 className='text-lg font-bold text-black truncate'>{book.Title}</h2>
                    <p className='text-sm text-gray-600 truncate'>{book.Author}</p>
                    <p className='text-sm text-gray-600'>{book.Year}</p>
                    <p className='text-lg text-black font-bold mt-2'>
                        Rp {book.Price.toLocaleString('id-ID')}
                    </p>
                    <p className='text-sm text-gray-600 mt-1'>
                        {book.Genres.map((genre) => genre.Name).join(', ')}
                    </p>
                    <p className={`text-md ${book.IsSold ? 'text-red-500' : 'text-green-500'}`}>{book.IsSold ? 'Sold' : 'Available'}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
