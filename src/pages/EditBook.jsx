import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditBook() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [age, setAge] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

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

        axios
            .get(`http://localhost:8080/books/${id}`)
            .then((res) => {
                const book = res.data.book;
                if (book.UserID !== Number(localStorage.getItem('user_id'))) {
                    navigate('/books');
                    return;
                }
                setTitle(book.Title);
                setAuthor(book.Author);
                setYear(book.ReleaseYear.toString());
                setAge(book.Age.toString());
                setPrice(book.Price.toString());
                setImage(book.Image);
                setSelectedGenres(book.Genres.map((genre) => genre.ID));
            })
            .catch((err) => console.log(err));
    }, [id]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !title ||
            !author ||
            !year ||
            !age ||
            !price ||
            !image ||
            selectedGenres.length === 0
        )
            return;

        const formattedGenres = selectedGenres.map((genreId) => ({
            id: genreId,
        }));

        const updatedBook = {
            title,
            author,
            releaseYear: Number(year),
            price: Number(price),
            image,
            age: Number(age),
            isSold: false,
            userID: Number(localStorage.getItem('user_id')),
            genres: formattedGenres,
        };

        axios
            .put(`http://localhost:8080/books/${id}`, updatedBook, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                if (res.data.book) {
                    navigate(`/books/${Number(res.data.book.ID)}`);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleGenreChange = (e) => {
        const value = parseInt(e.target.value);
        if (selectedGenres.includes(value)) {
            setSelectedGenres(selectedGenres.filter((id) => id !== value));
        } else {
            setSelectedGenres([...selectedGenres, value]);
        }
    };

    return (
        <div className='flex flex-col items-center bg-white rounded-lg border-2 border-lavender-5 p-4 sm:p-8 w-full shadow-md overflow-x-auto'>
            <h1 className='font-bold text-xl text-black mb-4'>Edit Book</h1>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Title:
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={title}
                            placeholder='Harry Potter'
                            onChange={(e) => setTitle(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='author'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Author:
                        </label>
                        <input
                            type='text'
                            name='author'
                            id='author'
                            value={author}
                            placeholder='J.K. Rowling'
                            onChange={(e) => setAuthor(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='releaseyear'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Release Year:
                        </label>
                        <input
                            type='number'
                            name='releaseyear'
                            id='releaseyear'
                            value={year}
                            placeholder='1997'
                            onChange={(e) => setYear(e.target.value)}
                            min={0}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='age'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Age (number of months after purchasing)
                        </label>
                        <input
                            type='number'
                            name='age'
                            id='age'
                            value={age}
                            placeholder='12'
                            onChange={(e) => setAge(e.target.value)}
                            min={0}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Price:
                        </label>
                        <input
                            type='number'
                            name='price'
                            id='price'
                            value={price}
                            placeholder='150000'
                            onChange={(e) => setPrice(e.target.value)}
                            min={0}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <label
                            htmlFor='image'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Cover Image (URL):
                        </label>
                        <input
                            type='text'
                            name='image'
                            id='image'
                            value={image}
                            placeholder='https://example.com/image.jpg'
                            onChange={(e) => setImage(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black focus:outline-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full'>
                        <label
                            htmlFor='genres'
                            className='block text-sm font-medium text-gray-700 text-left'
                        >
                            Genres:
                        </label>
                        <div className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm text-black p-2'>
                            {genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className='flex items-center'
                                >
                                    <input
                                        type='checkbox'
                                        id={`genre-${genre.id}`}
                                        name='genres'
                                        value={genre.id}
                                        checked={selectedGenres.includes(
                                            genre.id
                                        )}
                                        onChange={handleGenreChange}
                                        className='mr-2'
                                    />
                                    <label
                                        htmlFor={`genre-${genre.id}`}
                                        className='text-black'
                                    >
                                        {genre.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-5'>
                    <button
                        type='submit'
                        className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto'
                    >
                        Save Changes
                    </button>
                    <Link to={`/books/${id}`}
                        className='bg-gray-500 hover:bg-gray-600 hover:text-white text-white font-bold py-2 px-4 rounded w-full sm:w-auto'
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
