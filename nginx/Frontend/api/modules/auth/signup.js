import axios from './../axiosInstance'


export default async (req, res, next) => {
  const res = await axios.post('http://127.0.0.1:8000/pi/auth/users/', req.body.data)
  try {
    return res
  } catch (e) {
    console.log(e)
  }
}
