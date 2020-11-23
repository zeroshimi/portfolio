import axios from './../axiosInstance'

export default async (req, res, next) => {
  const res = await axios.post('http://127.0.0.1:8000/api/auth/jwt/verify/', req.body.params)
  try {
    return res
  } catch (e) {
    console.log(e)
  }
}
