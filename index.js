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
app.use(cors())

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
  // Panggil Model user & Chat
  const { mAllUser } = require('./res/models/users')
  const { mGetChat, mSendChat } = require('./res/models/chat')
  
  // Notif User ada Yang Online
  console.log('user is Online!')
  // Login Kedalam room
  socket.on('join-room', (roomId) => {
    console.log(`Room ID ${roomId} joined`)
    socket.join(roomId)
  })

  // Ambil Semua User (Soon diganti Friendlist)
  socket.on('get-list-users', (userId, roomId) => {
    console.log(` Displaying Users for UserID ${userId} at RoomID: ${roomId}`)
    mAllUser(userId)
      .then((res) => {
        console.log(`resource are sended to user RoomId : ${roomId}`)
        io.to(roomId).emit('res-get-list-users', res)
      })
      .catch((err) => {
        console.log(err)
      })
    })

  // Ambil List Chat
  socket.on('get-list-chat', (data) => {
    console.log('Fetching chat data From DB')
    mGetChat(data)
      .then((res) => {
        console.log(`Sending result to room #${data.roomId}`)
        console.log(`Datanya : ${res}`)
        // Kirrim ke Room ID
        io.to(data.roomId).emit('res-get-list-chat', res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  socket.on('send-message', (data) => {
    console.log('Sending chat data to DB')
    mSendChat(data)
      .then((res) => {
        console.log('Fetching Chat Again')
        mGetChat(data)
          .then((response) => {
            console.log(response)
            io.to(response[0].targetRoomId).emit('res-get-list-chat', response)
            io.to(response[0].senderRoomId).emit('res-get-list-chat', response)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
    })
})

// Start Server
server.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})