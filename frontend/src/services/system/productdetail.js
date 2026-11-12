import api from "../api/api"

export const showProduct = async (id) => {
  return await api.get(`/product/show_product/${id}`)
}

export const listBrand = async () => {
  return await api.get(`/brand/list_brand?per_page=99999`)
}

export const listCategory = async () => {
  return await api.get(`/category/list_category?per_page=99999`)
}

export const deleteProductImage = async (id) => {
  return await api.delete(`/productimage/delete_productimage/${id}`)
}

export const updateProduct = async (id, formData) => {
  return await api.put(`/product/update_product/${id}`, formData)
}
