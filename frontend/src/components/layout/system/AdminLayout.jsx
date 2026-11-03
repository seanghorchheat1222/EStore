import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function AdminLayout() {
  return (
    <>
      <Header></Header>
      <main className='pt-20 pl-2 md:pl-30 pr-2'>
        <Outlet></Outlet>
      </main>
      <Sidebar></Sidebar>
    </>

  )
}

export default AdminLayout