import api from "../api/api"

export const listShipping = async (page) => {
  return await api.get(`/shipping/list_shipping?page=${page}`)
}

