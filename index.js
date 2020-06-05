const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const beautify = require("json-beautify");
const calcResponse = require('./calc_response')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/device/:id/authenticate', async (req, res) => {
  console.log('--\nNew Register Request:')
  console.log(beautify(req.body, null, 2, 100));

  try {
    const authRequest = req.body
    // In this mocked implementation only 1001 is authorized
    authRequest.secret = authRequest.username === '1001'? '1234': ''
    res.json({ Success: authRequest.response === calcResponse(authRequest) })
  } catch(e) {
    res.sendStatus(503)
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Started rest registration server at http://localhost:${port}!`))
