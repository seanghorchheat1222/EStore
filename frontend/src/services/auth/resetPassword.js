import api from "../api/api"

export const requestResetPasswordOtp = async (email) => {
  return await api.post(`/user/request_resetpasswordotp`, email)
}

export const confirmResetPasswordOtp = async (form) => {
  return await api.post(`/user/confirm_resetpasswordotp`, form)
}

export const resetPassword = async (form) => {
  return await api.post(`/user/reset_password`, form)
}