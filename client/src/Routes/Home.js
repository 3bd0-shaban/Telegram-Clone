import React from 'react'
import { Sidebar, Header, Conversation } from '../Components/Exports'

const Home = () => {
  return (
    <>
      <Header />
      <div className='container px-0 max-w-[120rem] min-h-full max-h-screen overflow-hidden border-r border-l shadow-sm '>
        <div className='grid grid-cols-4'>
          <div className='col-span-1'>
            <Sidebar />
          </div>
          <div className='col-span-3 h-screen'>
            <img className='bg-repeat-space min-h-screen object-cover' src='/Images/pattern.png' alt='' />
            <Conversation />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
