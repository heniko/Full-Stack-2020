import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const users = {
    getAll
}

export default users