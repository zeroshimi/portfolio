import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000
})

export default async (req, res, next) => {
  await instance.post('api/auth/jwt/verify/', req.body)
    .then((response) => {
      return response
    }).catch((e) => {
      return e
    }
    )
}
