import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
  }
  return (
    <>
      <div className='flex justify-center w-full h-screen items-center flex-col gap-2'>
        <div>
          Page <span className='underline underline-offset-2'>{location.pathname.replace("/" , "")}</span>, Not Found!
        </div>
        <button className='cursor-pointer bg-[#040404] w-max h-11 justify-center items-center rounded-full shrink-0 flex text-[#FFFFFF] px-5' type='button' onClick={() => toHome()}>
          Go Back!
        </button>
      </div>
    </>
  )
}

export default NotFound