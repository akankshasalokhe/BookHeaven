import React from 'react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"
import { authActions } from '../../../store/auth'

function Sidebar({ data }) {
  const dispatch = useDispatch()
  const history = useNavigate()
  const role =  useSelector((state)=>state.auth.role) 

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col justify-between h-full'>
      <div className='flex items-center flex-col justify-center'>
        <img 
          src={data.avatar || './img/user.png'} 
          alt="User Avatar" 
          className='h-[12vh] w-auto rounded-full object-cover'
        />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.name}</p>
        <p className='mt-3 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:flex'></div>

      </div>
      
     {role === 0 && ( 
      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link 
          to='/profile' 
          className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
          Favourites
        </Link>

        <Link 
          to='/profile/orderHistory' 
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'
        >
          Order History
        </Link>

        <Link 
          to='/profile/settings' 
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'
        >
          Settings
        </Link>
      </div>)}

        {role === 1 && 
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link 
          to='/profile' 
          className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
         All Orders
        </Link>

        <Link 
          to='/profile/addBook' 
          className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'
        >
          Add Book
        </Link>

      </div>}


      <button 
        className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
      onClick={()=>{
        dispatch(authActions.logout())
        dispatch(authActions.changeRole(0))
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("role")
        history("/")
      }}>
        Log Out <FaArrowRightFromBracket className='ms-4' />
      </button>
    </div>
  );
}

export default Sidebar;
