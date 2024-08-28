import axios from 'axios'
import Utility from '@/utility/index'
import { configData } from '../../config'

const setToken = (config) => {
  const token = Utility.decryptSessionDetails('token', false)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

const server = axios.create({
  baseURL: configData.SERVICE_URI
})
server.interceptors.request.use(setToken)

export default {
  server
}
