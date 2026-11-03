import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MasterLayout from './components/layout/website/MasterLayout'
import Home from './pages/website/Home'
import Collection from './pages/website/Collection'
import New from './pages/website/New'
import Favorite from './pages/website/Favorite'
import Cart from './pages/website/Cart'
import Profile from './pages/website/Profile'
import NotFound from './404/NotFound'
import Signin from './auth/Signin'
import Auth from './auth/Auth'
import Dashboard from './pages/system/Dashboard'
import QuickOrder from './pages/system/QuickOrder'
import AdminLayout from './components/layout/system/AdminLayout'
import Product from './pages/system/Product'
import Category from './pages/system/Category'
import Brand from './pages/system/Brand'
import Record from './pages/system/Record'
import User from './pages/system/User'
import Setting from './pages/system/Setting'
import Shipping from './pages/system/Shipping'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Auth></Auth>}>
              <Route path='admin' element={<AdminLayout></AdminLayout>}>
                <Route path='' element={<Dashboard></Dashboard>}></Route>
                <Route path='quickorder' element={<QuickOrder></QuickOrder>}></Route>
                <Route path='products' element={<Product></Product>}></Route>
                <Route path='categories' element={<Category></Category>}></Route>
                <Route path='brands' element={<Brand></Brand>}></Route>
                <Route path='records' element={<Record></Record>}></Route>
                <Route path='shippings' element={<Shipping></Shipping>}></Route>
                <Route path='users' element={<User></User>}></Route>
                <Route path='setting' element={<Setting></Setting>}></Route>
              </Route>
          </Route>

          <Route element={<MasterLayout></MasterLayout>}>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/collections' element={<Collection></Collection>}></Route>
            <Route path='/new' element={<New></New>}></Route>
            <Route path='/favorite' element={<Favorite></Favorite>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
          </Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>

          <Route path='/signin' element={<Signin></Signin>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
