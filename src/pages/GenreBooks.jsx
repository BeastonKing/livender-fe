import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const GenreBooks = () => {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');

    useEffect(() => {
        axios
            .get('http://localhost:8080/genres')
            .then((res) => {
                const fetchedGenres = res.data.genres.map((genre) => ({
                    id: genre.ID,
                    name: genre.Name,
                }));
                setGenres(fetchedGenres);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let url = 'http://localhost:8080/books';
        console.log(selectedGenre);
        if (selectedGenre !== 'all') {
            url = `http://localhost:8080/books/genre/${selectedGenre}`;
        }

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, [selectedGenre]);

    return (
        <>
            <h1 className='text-lg text-black mt-10 px-5'>
                Find books by{' '}
                <span className='font-semibold text-lavender-5'>genre</span> to
                your heart's content!
            </h1>
            <div className='flex flex-col md:flex-row p-5'>
                <aside className='w-full md:w-1/4 mb-5 bg-lavender-4 p-4 rounded-lg shadow-xl h-fit'>
                    <h2 className='text-xl font-bold text-white mb-4'>
                        Filter by Genre
                    </h2>
                    <div className='flex px-3'>
                        <input
                            type='radio'
                            id='all'
                            name='genre'
                            value='all'
                            checked={selectedGenre === 'all'}
                            onChange={() => setSelectedGenre('all')}
                            className='mr-2'
                        />
                        <label htmlFor='all' className='text-white'>
                            All Genres
                        </label>
                    </div>

                    {genres.map((genre) => (
                        <div key={genre.id} className='flex px-3'>
                            <input
                                type='radio'
                                id={`genre-${genre.id}`}
                                name='genre'
                                value={genre.id}
                                checked={selectedGenre === genre.id}
                                onChange={() => setSelectedGenre(genre.id)}
                                className='mr-2'
                            />
                            <label
                                htmlFor={`genre-${genre.id}`}
                                className='text-white'
                            >
                                {genre.name}
                            </label>
                        </div>
                    ))}
                </aside>

                <div className='w-full md:w-3/4 flex flex-wrap items-start justify-center gap-6 p-5 overflow-x-auto'>
                    {books.length > 0 ? (
                        books.map((book) => <Card book={book} key={book.ID} />)
                    ) : (
                        <p className='text-black'>
                            No books found for the selected genres.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default GenreBooks;
