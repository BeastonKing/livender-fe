import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Order = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
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
            axios
                .get(`http://localhost:8080/orders/user/${user.ID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data.orders)
                    setOrders(res.data.orders);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-3 min-h-screen p-6 bg-gray-50'>
            {user && (
                <h1 className='text-3xl text-black my-3'>
                    Hello,{' '}
                    <span className='text-lavender-4 font-bold'>
                        {user.Fullname}
                    </span>
                    !
                </h1>
            )}
            <h2 className='text-black mb-5 text-xl'>Here are the books you've purchased: </h2>
            {orders.length ? (
                <div className='flex flex-wrap items-start justify-center gap-6 p-5 overflow-x-auto'>
                    {orders &&
                        orders.map((order) => <Card book={order.Book} key={order.Book.ID} />)}
                </div>
            ) : (
                <h2 className='italic text-black'>
                    You haven't posted any books.
                </h2>
            )}
        </div>
    );
};

export default Order;
