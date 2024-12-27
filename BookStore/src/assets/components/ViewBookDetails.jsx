import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from 'axios'



function ViewBookDetails() {
    const { id } = useParams();
    const [Data, setData]= useState()
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn) 
    const role = useSelector((state) => state.auth.role)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:1010/api/product/getbookbyid/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); 
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
}, []);
const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }

    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1010/api/favourite/addtoFavourite",
            {},
            {headers}
        )
        alert(response.data.message)

    }

    const handleCart = async ()=>{
        const response = await axios.put("http://localhost:1010/api/cart/addToCart",
            {},{headers}
        )
        alert(response.data.message)
    }

    const deleteBook = async () => {
        const response = await axios.delete("http://localhost:1010/api/product/deleteBook",
            {headers}
        )
        alert(response.data.message)
        navigate('/allbooks')
    }

    return (
        <>
            {Data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex lg:flex-row flex-col md:flex-row gap-8 items-center justify-center'>
                    <div className='   w-full lg:w-3/6 '>
                        <div className='flex flex-col lg:flex-row  justify-around bg-zinc-800 p-12 rounded'>
                        <img src={Data.url} alt='/' className= ' h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                        {isLoggedIn === true && role === 0 &&
                            <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                            <button className='bg-white rounded lg:rounded-full lg:text-2xl p-3 text-red-500 flex items-center justify-center' onClick={handleFavourite}><FaHeart />
                            <span className='ms-4 block lg:hidden'>Favourites</span>

                            </button>
                            <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full lg:text-2xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}><FaShoppingCart />
                            <span className='ms-4 block lg:hidden'>Add to Cart</span>
                            </button>
                        </div>
                        }

                        {isLoggedIn === true && role === 1 &&
                            <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                            <Link to={`/updateBook/${id}`}className='bg-white rounded lg:rounded-full lg:text-2xl p-3 text-red-500 flex items-center justify-center'><FaEdit />

                            <span className='ms-4 block lg:hidden'>Edit</span>

                            </Link>
                            <button className='text-red-500 rounded lg:rounded-full lg:text-2xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center'
                            onClick={deleteBook}><MdOutlineDeleteOutline />

                            <span className='ms-4 block lg:hidden'>Delete Book</span>
                            </button>
                        </div>
                        }
                        </div>
                    </div>
                   
                    <div className='p-4 w-full lg:w-3/6'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                        <p className='text-zinc-400 mt-1'>{Data.author}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className='me-3' />{Data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price: {Data.price}</p>
                    </div>
                </div>
            ) }
            { !Data && 
                <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            }
        </>
    );
}

export default ViewBookDetails;
