import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='bg-[#E9E9E9] py-10 px-2 md:px-10'>
        <div>
          <div className='text-[#363636]'>INFO</div>
          <div className='mt-5'>
            <ul>
              <li>
                <NavLink>PRICING</NavLink>
              </li>
              <li>
                <NavLink>ABOUT</NavLink>
              </li>
              <li>
                <NavLink>CONTACTS</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10'>
          <div className='text-[#363636]'>LANGUAGES</div>
          <div className='flex flex-col items-start mt-5'>
            <button>ENG</button>
            <button>KH</button>
            <button>CH</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer