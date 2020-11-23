import axios from './../axiosInstance'

// 解析用module
/* 
  * @param
  * @param {Object} params 
  * @param {String} params.name Sheet名
  * @param {Array} params.data 解析データ
  * @param {String} params.userId ユーザ識別id
  * @param {Number} params.id Sheetid
  * @oaram {String} params.book Bookの名前
*/
export default async (req, res, next) => {
  const url = '/api'
  const params = req.body.params
  const res = await axios.post(`${url}`, params)
  
  return res
}