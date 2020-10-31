import options from './optionsDjango'
const request = require('request')

export default async (req, res, next) => {
  options.url = 'http://localhost:8000/api/easy'
  options.method = 'GET'
  await request(options, (error, response, body) => {
    if (!error) {
      console.log('response status: ' + response.statusCode)
      console.log(
        'response headers content-type: ' + response.headers['content-type']
      )
      res.send(body)
    } else {
      console.log('error: ' + error.message)
      res.status(500)
      res.end('Internal Server Error')
    }
  })
}
