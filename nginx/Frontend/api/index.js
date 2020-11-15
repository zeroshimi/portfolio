import practice from './modules/practice'
import signup from './modules/auth/signup'
import jwtCreate from './modules/auth/jwtCreate'
import isLogin from './modules/auth/isLogin'
import xlsx from './modules/excel/xlsx'

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.send('world'))
app.post('/post', (req, res) => { res.send(req.body) })
app.post('/django', (req, res) => { practice(req, res) })
app.post('/jwtCreate', (req, res) => { jwtCreate(req, res) })
app.post('/signup', (req, res) => { signup(req, res) })
app.post('/isLogin', (req, res) => { isLogin(req.body) })
app.post('/xlsx/read-file', (req, res) => {xlsx._readFile(req)})

export default app
// backend-frontApi-frontは基本的にresの中身だけ送るような設計にする
