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


// Image Path
app.use('/img', express.static('./public/img'))


// Display Default Route
app.use('/', (req, res) => {
  res.send('Psst, Your Backend is Online.')
})

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
  const { mGetFriends, mPatchUser, mLogout, mSearchUser, mAddFriends, mDeleteFriends, mDetailUser} = require('./res/models/users')
  const { mGetChat, mSendChat, mDetailChat} = require('./res/models/chat')
  // Notif User ada Yang Online
  socket.on('connected', (data) => {
    const socketData = {socketId: socket.id}
    mPatchUser(socketData, data.id)
      .then((res) => {
        console.log(`${data.username} is Online on socket ${socket.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  socket.on('disconnect', () => {
    try{
      mLogout(socket.id)
        .then((response) => {
          if(response.length> 0) {
            const socketData = {
              socketId: null
            }
            mPatchUser(socketData, response[0].id)
            console.log(`${response[0].username} is disconnected`)
          } else {
            console.log('id not found')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch {
      console.log('Server Side Error')
    }
  })
  socket.on('logout', () => {
    try {
      mLogout(socket.id)
        .then((response) => {
          if(response.length > 0) {
            const socketData = {
              socketId: null
            }
            mPatchUser(socketData, response[0].id)
            console.log(`${response[0].username} is disconnected`)
          } else {
            console.log('id not found')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch {
      console.log('Server Side Error')
    }
  })
  // Login Kedalam room
  socket.on('join-room', (roomId) => {
    // console.log(`Room ID ${roomId} joined`)
    socket.join(roomId)
  })

  socket.on('search-name', (data) => {
    mSearchUser(data)
      .then((response) => {
        io.to(data.roomId).emit('res-search-name', response)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  // Ambil Semua User (Soon diganti Friendlist)
  socket.on('get-list-users', (userId, roomId) => {
    // console.log(` Displaying Users for UserID ${userId} at RoomID: ${roomId}`)
    const addDetail = async item => {
      mDetailChat(item)
        .then((resnya) => {
          return(resnya)
        })
    }
    let finalData = [] 
    mGetFriends(userId)
      .then(async (res) => {
        // console.log(`resource are sended to user RoomId : ${roomId}`)
        io.to(roomId).emit('res-get-list-users', res)
      })
      .catch((err) => {
        console.log(err)
      })
    })

  // Ambil List Chat
  socket.on('get-list-chat', (data) => {
    // console.log('Fetching chat data From DB')
    mGetChat(data)
      .then((res) => {
        // console.log(`Sending result to room #${data.roomId}`)
        // console.log(`Datanya : ${res}`)
        // Kirrim ke Room ID
        io.to(data.roomId).emit('res-get-list-chat', res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  socket.on('send-message', (data) => {
    // console.log('Sending chat data to DB')
    mSendChat(data)
      .then((res) => {
        mGetChat(data)
          .then((response) => {
            mDetailUser(data.targetId)
              .then((resTarget) => {
                mDetailUser(data.senderId)
                  .then((resSender) => {
                    io.to(response[0].targetRoomId).emit('res-get-list-chat', response)
                    io.to(resTarget[0].roomId).emit('res-new-chat', {data: 'New Message', from: resSender[0].name, message: data.msg })
                    io.to(response[0].senderRoomId).emit('res-get-list-chat', response)
                  })
                  .catch((err) => {
                    // Error dari Sender
                    console.log(err)
                  })
              })
              // Error dari target
              .catch((err) => {
                console.log(err)
              })
          })
          // Error cari History Chat
          .catch((err) => {
            console.log(err)
          })
      })
      // Error kirim pesan
      .catch((err) => {
        console.log(err)
      })
    })

  socket.on('add-friends', (data) => {
    const dataA = {
      userId: data.userId,
      targetId: data.targetId,
      status: data.status
    }
    const dataB = {
      userId: data.targetId,
      targetId: data.userId,
      status: data.status
    }
    mAddFriends(dataA)
      .then((res1) => {
        mAddFriends(dataB)
          .then((res2) => {
            mGetFriends(data.userId)
              .then((resUser) => {
                io.to(data.userRoomId).emit('res-get-list-users', resUser)
                mGetFriends(data.targetId)
                  .then((resTarget) => {
                    io.to(data.targetRoomId).emit('res-get-list-users', resTarget)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }),
  socket.on('delete-friends', (data) => {
    console.log(`Someone want to delete ${data}`)
    const dataA = {
      userId: data.userId,
      targetId: data.targetId,
      status: data.status
    }
    const dataB = {
      userId: data.targetId,
      targetId: data.userId,
      status: data.status
    }
    mDeleteFriends(dataA)
      .then((res1) => {
        mDeleteFriends(dataB)
          .then((res2) => {
            mGetFriends(data.userId)
              .then((resUser) => {
                io.to(data.userRoomId).emit('res-get-list-users', resUser)
                mGetFriends(data.targetId)
                  .then((resTarget) => {
                    io.to(data.targetRoomId).emit('res-get-list-users', resTarget)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              })
              .catch((err) => {
                console.log(err)
              })
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