import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createNew = nameObject => {
  return axios.post(baseUrl, nameObject)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, createNew, removePerson }