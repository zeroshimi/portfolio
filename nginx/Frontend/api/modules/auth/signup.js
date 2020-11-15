import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})

export default async (req, res, next) => {
  await instance.post('http://127.0.0.1:8000/pi/auth/users/', req.body.data)
    .then((response) => {
      res.send(response.data)
      return 0
    }).catch((e) => {
      res.send(e)
      return 0
    }
    )
}
