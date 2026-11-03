import { Navigate, Outlet } from 'react-router-dom'

function Auth() {
  const token = { token: "12313132" }
  const user = { role: "admin" }

  return (
    token?.token && user.role === "admin" ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
  )
}

export default Auth