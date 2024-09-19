import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Books from './pages/Books';
import AllBooks from './pages/AllBooks';
import AddBook from './pages/AddBook';
import Genres from './pages/Genres';
import BookDetail from './pages/BookDetail';
import EditBook from './pages/EditBook';
import Profile from './pages/Profile';
import GenreBooks from './pages/GenreBooks';
import Welcome from './pages/Welcome';
import Order from './pages/Order';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/' element={<Home />}>
                    <Route index element={<Welcome />} />
                    <Route
                        path='genres'
                        element={
                            <ProtectedRoute>
                                <GenreBooks />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='profile'
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='orders'
                        element={
                            <ProtectedRoute>
                                <Order />
                            </ProtectedRoute>
                        }
                    />

                    <Route path='books' element={<Books />}>
                        <Route index element={<AllBooks />} />
                        <Route
                            path='add'
                            element={
                                <ProtectedRoute>
                                    <AddBook />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='edit/:id'
                            element={
                                <ProtectedRoute>
                                    <EditBook />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path=':id'
                            element={
                                <ProtectedRoute>
                                    <BookDetail />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
