import axios from 'axios'

const api = axios.create({
    baseURL: 'https://guia-turistico-api.herokuapp.com/'
})

export default api;