import React, { useEffect, useState } from 'react';
import Loader from './Loader/Loader';
import BookCard from './BookCard';

function RecentlyAdded() {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:1010/api/product/getrecentbook");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); // 'data' as per your backend response
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-2xl sm:text-3xl text-yellow-100 text-center sm:text-left'>
                Recently Added Books
            </h4>
            {!Data.length && (
                <div className='flex items-center justify-center my-8'>
                    <Loader />
                </div>
            )}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentlyAdded;
