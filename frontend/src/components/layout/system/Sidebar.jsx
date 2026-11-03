import { NavLink, useLocation, useNavigate } from "react-router-dom"
import DashboardIcon from "../../ui/DashboardIcon"
import CartIcon from "../../ui/CartIcon";
import CategoryIcon from "../../ui/CategoryIcon";
import RecordIcon from "../../ui/RecordIcon";
import ShippingIcon from "../../ui/ShippingIcon";
import ProfileIcon from "../../ui/ProfileIcon";
import SettingIcon from "../../ui/SettingIcon";
import BrandIcon from "../../ui/BrandIcon";
import LogoutIcon from "../../ui/LogoutIcon";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const toPage = (path) => {
    navigate(path)
  }

  const navs = [
    {
      id: 1,
      icon: DashboardIcon,
      path: "/admin"
    },
    {
      id: 2,
      icon: CartIcon,
      path: "/admin/quickorder"
    },
    {
      id: 3,
      icon: CategoryIcon,
      path: "/admin/products"
    },
    {
      id: 4,
      icon: BrandIcon,
      path: "/admin/brands"
    },
    {
      id: 5,
      icon: CategoryIcon,
      path: "/admin/categories"
    },
    {
      id: 6,
      icon: RecordIcon,
      path: "/admin/records"
    },
    {
      id: 7,
      icon: ShippingIcon,
      path: "/admin/shippings"
    },
    {
      id: 8,
      icon: ProfileIcon,
      path: "/admin/users"
    },
    {
      id: 9,
      icon: SettingIcon,
      path: "/admin/setting"
    }
  ]



  return (
    <>
      <div className={`fixed w-30 md:left-0 top-0 hidden md:flex flex-col h-full`}>
        <div className="h-20 flex justify-center items-center shrink-0">
          <div className='flex flex-col gap-1.5 cursor-pointer' >
            <span className='inline-block w-10 h-1 bg-[#040404] rounded-full'></span>
            <span className='inline-block w-8 h-1 bg-[#040404] rounded-full'></span>
            <span className='inline-block w-5 h-1 bg-[#040404] rounded-full'></span>
          </div>
        </div>

        <div className='flex h-full gap-4 justify-start mt-5 flex-1 flex-col items-center'>
          {
            navs.map((nav) => {
              const Icon = nav.icon
              return (
                <button className={`cursor-pointer  w-11 h-11 justify-center items-center rounded-full shrink-0 flex ${location.pathname === nav.path ? "bg-[#040404]" : "bg-[#E9E9E9]"}`} type='button' onClick={() => toPage(nav.path)}>
                  <NavLink >
                    <div className='w-4 h-4'>
                      <Icon className={`w-full h-full ${location.pathname === nav.path ? "fill-[#FFFFFF]" : "fill-[#363636]"}`}>
                      </Icon>
                    </div>
                  </NavLink>
                </button>
              )
            })
          }
        </div>

        <div className="justify-center flex flex-col items-center w-full h-20 shrink-0">
          <button className='cursor-pointer bg-[#040404] w-11 h-11 justify-center items-center rounded-full shrink-0 flex' type='button'>
            <NavLink>
              <div className='w-4 h-4'>
                <LogoutIcon className={"fill-[#FFFFFF] w-full h-full"}>
                </LogoutIcon>
              </div>
            </NavLink>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar