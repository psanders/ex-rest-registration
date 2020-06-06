const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const beautify = require("json-beautify");
const calcResponse = require('./calc_response')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const config = {
  port: process.env.PORT || 3000,
  domain: process.env.DOMAIN || 'sip.local',
  username: process.env.USERNAME || '1001',
  secret: process.env.SECRET || '1234'
}

app.post('/api/device/:id/authenticate', (req, res) => {
  console.log('--\nNew Register Request:')
  console.log(beautify(req.body, null, 2, 100))

  try {
    const authRequest = req.body
    // In this mocked implementation only 1001 is authorized
    authRequest.secret =
      authRequest.username === config.username &&
      authRequest.realm === config.domain
      ? config.secret : ''
    res.json({ Success: authRequest.response === calcResponse(authRequest) })
  } catch(e) {
    res.sendStatus(503)
  }
})

app.listen(config.port, () => console.log(`Started rest registration server at http://localhost:${config.port}!`))
