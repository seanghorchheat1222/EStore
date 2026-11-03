import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Auth() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  
  return (
    token?.token && user.role === "admin" ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
  )
}

export default Auth