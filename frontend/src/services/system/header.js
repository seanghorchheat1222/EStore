import api from "../api/api"

export const signout = async (token) => {
  return await api.post(`/auth/logout`, token)
}