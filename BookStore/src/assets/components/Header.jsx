import React from 'react'
import { Link } from 'react-router-dom'

function Header() { 
  return (
    <div className='md:h-[75vh] flex flex-col md:flex-row items-center justify-center p-4'>
        <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center md:items-start justify-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-7xl font-semibold text-yellow-100 text-center md:text-left'>
                Discover Your Next Great Read
            </h1>
            <p className='mt-4 text-lg sm:text-xl text-zinc-300 text-center md:text-left'>
                Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
            </p>
            <div className='mt-8'>
                <Link to='/allBooks' className='text-yellow-100 text-lg sm:text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 py-3 hover:bg-zinc-800 rounded-full'>
                    Discover Books
                </Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
            <img src='./img/book-table.jpg' alt='hero' className='w-full h-auto object-cover' />
        </div>
    </div>
  )
}

export default Header
