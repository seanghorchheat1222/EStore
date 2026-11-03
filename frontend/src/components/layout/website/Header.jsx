import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FavoriteIcon from '../../ui/FavoriteIcon'
import CartIcon from '../../ui/CartIcon'
import ProfileIcon from '../../ui/ProfileIcon'
import SearchIcon from '../../ui/SearchIcon'
import LogoutIcon from '../../ui/LogoutIcon'
import SettingIcon from '../../ui/SettingIcon'
import { useDispatch, useSelector } from 'react-redux'
import { clearToken } from '../../../store/tokenSlice'
import { clearUser } from '../../../store/userSlice'
import { signout } from '../../../services/website/header'

function Header() {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const [isloading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isMenu === true) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMenu])

  const toggleMenu = () => {
    setIsMenu(!isMenu)
  }


  const toFavorite = () => {
    navigate('/favorite')
  }

  const toCart = () => {
    navigate('/cart')
  }

  const toProfile = () => {

    navigate('/signin')
  }

  const onSignout = async () => {
    try {
      setIsLoading(true)
      const response = await signout(token.token)
      if (response.status === 204) {
        dispatch(clearUser())
        dispatch(clearToken());
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>
      <div className='flex justify-between h-20 items-center px-2 md:px-10'>
        <div className='flex flex-row gap-10 items-center'>
          <div className='flex flex-col gap-1.5 cursor-pointer' onClick={() => toggleMenu()}>
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

          {
            token?.token && user.role === "admin"
              ?
              <button className='cursor-pointer bg-[#040404] w-11 h-11 justify-center items-center rounded-full shrink-0 flex' type='button' onClick={() => onSignout()}>
                {
                  isloading ? <div className='h-7 w-7 rounded-full relative'>
                    <div className='h-full w-full border-3 border-[rgba(255,255,255,0.50)] rounded-full absolute top-0 left-0 z-1'></div>
                    <div className='h-full w-full border-l-3 border-t-3  border-[rgba(255,255,255,100)] rounded-full absolute top-0 left-0 animate-spin z-2'></div>
                  </div> : <NavLink>
                    <div className='w-4 h-4'>
                      <LogoutIcon className={"fill-[#FFFFFF] w-full h-full"}>
                      </LogoutIcon>
                    </div>
                  </NavLink>
                }
              </button>
              :
              token?.token && user.role === "user"
                ?
                <button className='cursor-pointer bg-[#040404] w-11 h-11 flex justify-center items-center rounded-full shrink-0' type='button'>
                  <NavLink>
                    <div className='w-4 h-4'>
                      <SettingIcon className={"fill-[#FFFFFF] w-full h-full"}>
                      </SettingIcon>
                    </div>
                  </NavLink>
                </button>
                :
                <button className='cursor-pointer bg-[#040404] w-11 h-11 flex justify-center items-center rounded-full shrink-0' type='button' onClick={() => toProfile()}>
                  <NavLink>
                    <div className='w-4 h-4'>
                      <ProfileIcon className={"fill-[#FFFFFF] w-full h-full"}>
                      </ProfileIcon>
                    </div>
                  </NavLink>
                </button>
          }

        </div>
      </div>

      <div className={`fixed w-full md:w-[40%] h-full bg-[rgba(255,255,255,0.50)] backdrop-blur-sm p-2 md:p-4 transition-all duration-300 ease-in-out ${isMenu ? 'left-0' : '-left-full'} top-20`}>
        <div className='bg-[#E9E9E9] flex flex-row h-11 items-center gap-1 pl-2'>
          <div className='w-5 h-5'>
            <SearchIcon className={"fill-[#363636] w-full h-full"}>
            </SearchIcon>
          </div>
          <input placeholder='Search....' type="text" className='outline-none text-[#363636] w-full placeholder:text-[#363636]' />
        </div>
        <div className='flex md:hidden justify-start mt-5'>
          <nav>
            <ul className='flex gap-5 flex-col'>
              {
                navs.map((nav) =>
                  <li key={nav.id}>
                    <NavLink to={nav.path}>{nav.label}</NavLink>
                  </li>
                )
              }
              <li>
                <NavLink to='/favorite'>Favorite</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header