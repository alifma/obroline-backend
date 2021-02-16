// Definisi Express Dasar
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

// DotEnv File
const {
  PORT
} = require('./res/helpers/env')

// CORS
const cors = require('cors')

// Tambahkan Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Route List
const routeUsers = require('./res/routes/users')
app.use(routeUsers)

// Display Default Route
app.use('/', (req, res) => {
  res.send('Psst, Your Backend is Online.')
})

// Image Path
app.use('/img', express.static('./public/img'))

// Server HTTP Socket IO
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

// Config Event Socket IO
io.on('connection', (socket) => {
  console.log('User Connected')
  socket.on('test', (payload) => {
    console.log(payload)
  })
  socket.on('pesan', (payload) => {
    io.emit('response-pesan', payload)
  })
})

// Start Server
server.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})