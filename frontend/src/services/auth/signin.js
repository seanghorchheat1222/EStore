import api from "../api/api"

export const currentUser = async () => {
  return await api.get(`/auth/current_user`);
}

export const signin = async(form) => {
  return await api.post(`/auth/login`, form)
}