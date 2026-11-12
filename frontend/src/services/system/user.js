import api from "../api/api"

export const listUser = async () => {
  return await api.get(`/user/list_user`)
}
