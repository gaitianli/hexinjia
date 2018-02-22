import * as axios from 'axios'
axios.defaults.withCredentials = true
let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`
}

export default axios.create(options)