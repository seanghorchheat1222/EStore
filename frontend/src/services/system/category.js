import api from "../api/api"

export const listCategory = async (page) => {
  return await api.get(`/category/list_category?page=${page}`)
}

export const createCategory = async (form) => {
  return await api.post(`/category/create_category`, form)
}

export const showCategory = async (id) => {
  return await api.get(`/category/show_category/${id}`)
}

export const updateCategory = async (id, form) => {
  return await api.put(`/category/update_category/${id}`, form)
}

export const deleteCategory = async (id) => {
  return await api.delete(`/category/delete_category/${id}`)
}


