import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})

export default async (req, res, next) => {
  const res = await instance.post('http://127.0.0.1:8000/api/auth/jwt/create/', req.body.data)
  try {
    return res
  } catch (e) {
    console.log(e)
  }
}
