import api from "../api/api"

export const listProduct = async (page, categoryId) => {
  return await api.get(`/product/list_product?page=${page}&&per_page=8&&is_active=1&&category_id=${categoryId}`)
}

export const listCategory = async () => {
  return await api.get(`/category/list_category`)
}

export const showProduct = async (id) => {
  return await api.get(`/product/show_product/${id}`)
}

export const order = async (form) => {
  return await api.post(`/order/order`, form)
}

