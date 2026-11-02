import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function MasterLayout() {
  return (
    <>
      <div className='px-2 md:px-10 w-full'>
        <Header></Header>
        <main>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div> 
    </>
  )
}

export default MasterLayout