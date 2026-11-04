import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function MasterLayout() {
  return (
    <>
      <div >
        <Header></Header>
        <main className='px-2 md:px-10 w-full min-h-screen pb-5 pt-5'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div> 
    </>
  )
}

export default MasterLayout