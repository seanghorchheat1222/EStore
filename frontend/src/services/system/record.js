import api from "../api/api"

export const listRecord = async (page) => {
  return await api.get(`/record/list_record?page=${page}`)
}

export const showRecord = async (id) => {
  return await api.get(`/record/show_record/${id}`)
}

