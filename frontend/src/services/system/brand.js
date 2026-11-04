import api from "../api/api"

export const listBrand = async (page) => {
  return await api.get(`/brand/list_brand?page=${page}`)
}

export const createBrand = async (form) => {
  return await api.post(`/brand/create_brand`, form)
}

export const showBrand = async (id) => {
  return await api.get(`/brand/show_brand/${id}`)
}

export const updateBrand = async (id, form) => {
  return await api.put(`/brand/update_brand/${id}`, form)
}

export const deleteBrand = async (id) => {
  return await api.delete(`/brand/delete_brand/${id}`)
}


