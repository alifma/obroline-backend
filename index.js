// Definisi Express Dasar
const express = require('express')
const http = require('http')
const app = express()

// History Router
const history = require('connect-history-api-fallback')

// Ambil file Socket
const socket = require('./res/socket/socket')

// DotEnv File
const {
  PORT
} = require('./res/helpers/env')

// CORS
const cors = require('cors')
app.use(cors())

// Tambahkan Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Route List
const routeUsers = require('./res/routes/users')
app.use(routeUsers)

// Image Path
app.use('/img', express.static('./public/img'))

app.use(history({
  verbose: true
}))

// Deploy FrontEndPath
app.use('/', express.static('./dist'))

// Server HTTP Socket IO
const server = http.createServer(app)
socket(server)

// Start Server
server.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})