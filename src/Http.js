import axios from 'axios'
import Auth from './Auth'

const BASE_URL = 'http://localhost:5000/api'

class Http {
  static withOptions (secured = false) {
    let options = { headers: {} }

    if (secured) {
      options.headers['Authorization'] = `bearer ${Auth.getToken()}`
    }

    return options
  }

  static processResponse (axiosPromise) {
    return axiosPromise
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          return err.response.data
        }
        window.alert(err)
      })
  }

  static get (url, secured = false) {
    return Http.processResponse(
      axios.get(`${BASE_URL}${url}`, Http.withOptions(secured)))
  }

  static post (url, data, secured = false) {
    return Http.processResponse(
      axios.post(`${BASE_URL}${url}`, data, Http.withOptions(secured)))
  }

  static put (url, data, secured = false) {
    return Http.processResponse(
      axios.put(`${BASE_URL}${url}`, data, Http.withOptions(secured)))
  }

  static delete (url, data, secured = false) {
    return Http.processResponse(
      axios.delete(`${BASE_URL}${url}`, data, Http.withOptions(secured)))
  }
}

export default Http
