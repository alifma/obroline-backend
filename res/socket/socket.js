// Require Package Socket.IO
const socketio = require('socket.io')

// Export Server Socket
module.exports = (server) => {

// CORS SocketIO
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

// Config Event Socket IO
io.on('connection', (socket) => {
  // Panggil Model user & Chat
  const { mGetFriends, mPatchUser, mLogout, mSearchUser, mAddFriends, mDeleteFriends, mDetailUser} = require('../models/users')
  const { mGetChat, mSendChat, mDetailChat, mDeleteChat} = require('../models/chat')
  // Notif User ada Yang Online
  socket.on('connected', (data) => {
    const socketData = {socketId: socket.id}
    // Set Socket ID yang connect ke database
    mPatchUser(socketData, data.id)
      .then((res) => {
        console.log(`${data.username} is Online on socket ${socket.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  // Hapus SocketID yang disconnected
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

  // Hapus SocketID yang Logout
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
  // Pencarian Nama
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
    mGetFriends(userId)
      .then((res) => {
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
        // Kirrim ke Room ID
        io.to(data.roomId).emit('res-get-list-chat', res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  // Kirim Pesan
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
                    io.to(response[0].senderRoomId).emit('res-target-data', resTarget[0])
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

  // Tambahkan Teman
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
  // Hapus Teman
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
  // Hapus Chat
  socket.on('delete-chat', (data) => {
    mDeleteChat(data.id)
      .then((res1) => {
        mGetChat(data)
          .then((response) => {
            mDetailUser(data.targetId)
              .then((resTarget) => {
                mDetailUser(data.senderId)
                  .then((resSender) => {
                    io.to(response[0].targetRoomId).emit('res-get-list-chat', response)
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
      .catch((err) => {
        console.log(err)
      })
    })
  })
}