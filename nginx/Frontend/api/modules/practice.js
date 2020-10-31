const axios = require('axios')

const options = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
}

export default async (req, res, next) => {
  // const url = 'analysis/'
  await axios.get('http://localhost:8000/analysis/')
    .then((response) => {
      res.send(response)
    })

  //  res.send(options.url)
  //  res.send(options)
  /* if (req.body.data.method === 'GET') {
    await axios.get(url, options).then((response) => {
      res.send('response status: ' + response.statusCode)
      res.send(
        'response headers content-type: ' + response.headers['content-type']
      )
      return res.send(response)
    }
    ).catch((e) => {
      return res.send('error: ' + e.message)
    })
    return 0
  } else if (req.body.data.method === 'POST') {
    options.data = req.body.data
    await axios.get(url, options)
      .then((response) => {
        res.send('response status: ' + response.statusCode)
        res.send('response headers content-type: ' + response.headers['content-type'])
        return res.send(response)
      }
      )
      .catch((e) => {
        return res.send('error: ' + e.message)
      })
    return 0
  } else {
    return res.send('You must set ths Methods')
  } */
}
