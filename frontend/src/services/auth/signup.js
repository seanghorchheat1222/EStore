import api from "../api/api"

export const requestOtp = async (email) => {
  return await api.post(`/user/request_otp`, email)
}

export const confirmOtp = async (form) => {
  return await api.post(`/user/confirm_otp`, form)
}

export const createUser = async (form) => {
  return await api.post(`/user/create_user`, form)
}