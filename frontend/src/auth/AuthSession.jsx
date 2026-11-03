import { useDispatch } from "react-redux"
import { clearToken } from "../store/tokenSlice";
import { clearUser } from "../store/userSlice";
import { currentUser } from "../services/auth/authsession";
import { useEffect } from "react";

function AuthSession({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checksession()
  }, [dispatch])

  const checksession = async () => {
    try {
      await currentUser();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(clearToken())
        dispatch(clearUser())
      }
      console.log(err)
    }
  }

  return children
}

export default AuthSession