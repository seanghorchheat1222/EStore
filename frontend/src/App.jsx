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

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
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
