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

function App() {
    return (
        <>
            <Routes>
                {/* <Route
                    path='/'
                    element={
                        <div>
                            <h1>Hello world</h1>
                        </div>
                    }
                /> */}
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/' element={<Home />}>
                    <Route index element={<h1>Explore Unsigned</h1>} />
                    <Route
                        path='explore'
                        element={
                            <ProtectedRoute>
                                <Genres />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='books'
                        element={
                            <ProtectedRoute>
                                <Books />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <AllBooks />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='add'
                            element={
                                <ProtectedRoute>
                                    <AddBook />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='edit'
                            element={
                                <ProtectedRoute>
                                    <h1>Edit Book</h1>
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
                </Route>
            </Routes>
        </>
    );
}

export default App;
