import api from "../api/api"

export const signout = async (token) => {
  return await api.post(`/auth/logout`, token)
}

export const setSetting = async (formData) => {
  return await api.post(`/setting/set_setting`, formData)
}

export const currentUser = async () => {
  return await api.get(`/auth/current_user`);
}