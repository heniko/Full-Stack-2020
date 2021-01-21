import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  return axios.get(baseUrl).then(response => response.data).catch(error => error.response.data)
}

const create = async (newObj, user) => {
  const conf = {
    headers: { Authorization: `bearer ${user.token}` }
  }
  const res = await axios.post(baseUrl, newObj, conf)
  return res.data
}

const like = async (id) => {
  const res = await axios.post(`${baseUrl}/${id}/like`)
  return res.data
}

const deleteBlog = async (id, user) => {
  const conf = {
    headers: { Authorization: `bearer ${user.token}` }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, conf)
  return res.data
}

const blogs = {
  getAll,
  create,
  like,
  deleteBlog
}

export default blogs