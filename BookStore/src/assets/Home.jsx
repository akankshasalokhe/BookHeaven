import React from 'react'
import Header from './components/Header'
import RecentlyAdded from './components/RecentlyAdded'

function Home() {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Header/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home