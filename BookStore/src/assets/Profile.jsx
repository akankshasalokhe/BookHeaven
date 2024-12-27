import React, { useState, useEffect } from 'react'
import Sidebar from './components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from './components/Loader/Loader';
import axios from 'axios'
import MobileNav from './components/Profile/MobileNav';

function Profile() {
  const [profile, setProfile] = useState(null); // Set initial state to null
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1010/api/auth/getuserinfo", { headers })
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetch();
  }, [])

  return (
    <div className='bg-zinc-900 px-4 sm:px-8 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
      {profile === null ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          {/* Sidebar for Desktop and Tablet */}
          <div className='w-full md:w-1/4 lg:w-1/6 h-auto md:h-screen'>
            <Sidebar data={profile} />
            <MobileNav /> {/* Mobile navigation */}
          </div>

          {/* Main Content Area */}
          <div className='w-full md:w-3/4 lg:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile;
