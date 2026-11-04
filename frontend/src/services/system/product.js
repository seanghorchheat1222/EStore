import api from "../api/api"

export const listBrand = async () => {
  return await api.get(`/brand/list_brand?per_page=99999`)
}

export const listCategory = async () => {
  return await api.get(`/category/list_category?per_page=99999`)
}

export const listProduct = async (page) => {
  return await api.get(`/product/list_product?page=${page}`)
}