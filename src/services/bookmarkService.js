import router from '@/router'
import Api from './serviceHandler'

export default {
  fetch (path) {
    return new Promise((resolve, reject) => {
      Api.server.get(path)
        .then((result) => {
          if (result.status === 200) {
            resolve(result.data)
          } else if (result.status === 400) {
            reject(result.data.message)
          }
        }).catch((err) => {
          if (err.response?.status === 401) {
            router.push('/Login')
          }
          if (err.response?.data) {
            reject(err.response.data)
          }
        })
    })
  },
  post (path, data) {
    return new Promise((resolve, reject) => {
      Api.server.post(path, data)
        .then((result) => {
          if (result.status === 200) {
            resolve(result.data)
          } else if (result.status === 400) {
            reject(result.data.message)
          }
        }).catch((err) => {
          if (err.response?.status === 401) {
            router.push('/Login')
          }
          if (err.response?.data) {
            reject(err.response.data)
          }
        })
    })
  },
  delete (path) {
    return new Promise((resolve, reject) => {
      Api.server.delete(path)
        .then((result) => {
          if (result.status === 200) {
            resolve(result.data)
          } else if (result.status === 400) {
            reject(result.data.message)
          }
        }).catch((err) => {
          if (err.response?.status === 401) {
            router.push('/Login')
          }
          if (err.response?.data) {
            reject(err.response.data)
          }
        })
    })
  }
}
