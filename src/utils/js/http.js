import axios from 'axios'
import store from '../../redux/store.js'

axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.request.use(
  function (config) {
    // 显示loading
    store.dispatch({
      type: 'change_loading',
      payload: true,
    })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    store.dispatch({
      type: 'change_loading',
      payload: false,
    })
    return response
  },
  function (error) {
    store.dispatch({
      type: 'change_loading',
      payload: false,
    })
    return Promise.reject(error)
  }
)

export default axios