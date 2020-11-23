import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: 'http://127.0.0.1:8000', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json',
  timeout: 5000
})

export default axios