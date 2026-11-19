import api from "../api/api"

export const listUser = async (page) => {
  return await api.get(`/user/list_user?${page}`)
}
