import axios from 'axios'
import Auth from './Auth'

const BASE_URL = 'http://localhost:5000/api'

class Http {
  static get (url, secured = false) {
    let axiosOptions = { headers: {} }

    if (secured) {
      axiosOptions.headers['Authorization'] = `bearer ${Auth.getToken()}`
    }

    return axios.get(`${BASE_URL}${url}`, axiosOptions)
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          return err.response.data
        }

        window.alert(err)
      })
  }

  static post (url, data, secured = false) {
    let axiosOptions = { headers: {} }

    if (secured) {
      axiosOptions.headers['Authorization'] = `bearer ${Auth.getToken()}`
    }

    return axios.post(`${BASE_URL}${url}`, data, axiosOptions)
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          return err.response.data
        }
        window.alert(err)
      })
  }
}

export default Http
