import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FavoriteIcon from '../../ui/FavoriteIcon'
import CartIcon from '../../ui/CartIcon'
import ProfileIcon from '../../ui/ProfileIcon'

function Header() {
  const navigate = useNavigate();

  const navs = [
    {
      id: 1,
      label: "Home",
      path: "/"
    },
    {
      id: 2,
      label: "Collections",
      path: "/collections"
    },
    {
      id: 3,
      label: "New",
      path: "/new"
    }
  ]

  const toFavorite = () => {
    navigate('/favorite')
  }

  const toCart = () => {
    navigate('/cart')
  }

  const toProfile = () => {
    
    

    navigate('/signin')
  }



  return (
    <>
      <div className='flex justify-between h-20 items-center'>
        <div className='flex flex-row gap-10 items-center'>
          <div className='flex flex-col gap-1.5 cursor-pointer'>
            <span className='inline-block w-10 h-1 bg-[#040404] rounded-full'></span>
            <span className='inline-block w-8 h-1 bg-[#040404] rounded-full'></span>
            <span className='inline-block w-5 h-1 bg-[#040404] rounded-full'></span>
          </div>
          <div className='hidden md:block'>
            <nav>
              <ul className='flex gap-10'>
                {
                  navs.map((nav) =>
                    <li key={nav.id}>
                      <NavLink to={nav.path}>{nav.label}</NavLink>
                    </li>
                  )
                }
              </ul>
            </nav>
          </div>
        </div>
        <div className='flex gap-2 md:gap-5'>
          <button className='cursor-pointer bg-[#040404] w-11 h-11 justify-center items-center rounded-full shrink-0 hidden md:flex' type='button' onClick={() => toFavorite()}>
            <NavLink>
              <div className='w-4 h-4'>
                <FavoriteIcon className={"fill-[#FFFFFF] w-full h-full -rotate-45"}>
                </FavoriteIcon>
              </div>
            </NavLink>
          </button>

          <button className='cursor-pointer bg-transparent w-full h-11 flex justify-center items-center rounded-full' type='button' onClick={() => toCart()}>
            <div className='w-20 h-full bg-[#040404] text-[#FFFFFF] rounded-2xl  items-center justify-center hidden md:flex'>
              Cart
            </div>
            <div className='cursor-ppinter bg-transparent border-4 w-11 h-11 flex justify-center items-center rounded-full shrink-0'>
              <NavLink>
                <div className='w-4 h-4'>
                  <CartIcon className={"fill-[#040404] w-full h-full"}>
                  </CartIcon>
                </div>
              </NavLink>
            </div>
          </button>

          <button className='cursor-pointer bg-[#040404] w-11 h-11 flex justify-center items-center rounded-full shrink-0' type='button' onClick={() => toProfile()}>
            <NavLink>
              <div className='w-4 h-4'>
                <ProfileIcon className={"fill-[#FFFFFF] w-full h-full"}>
                </ProfileIcon>
              </div>
            </NavLink>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header