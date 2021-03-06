// Koneksi Database
const connection = require('../config/database')

// Eksport Module
module.exports = {
  mLogin: () => {
    return
  },
  // Get Detail Users
  mDetailUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // Check Duplicate email
  mCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // Register New Account
  mRegister: (dataUsers) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', dataUsers, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // GetFriends
  mGetFriends: (userId) => {
    return new Promise((resolve, reject) => {
      const sql1 = `SELECT MAX(chat.id) as newChatId, chat.message as message, chat.created_at as created_at, chat.senderId as senderId, target.id as id, target.roomId as roomId, target.name as name, target.username as username, target.handphone as handphone, target.email as email, target.image as image, target.bio as bio, target.location as location, target.socketId as socketId,
      friendship.status as friendshipStatus FROM friendship LEFT JOIN users as target ON friendship.targetId = target.id LEFT JOIN chat ON (target.id = chat.senderId AND chat.targetID = friendship.userId ) OR (target.id = chat.targetId AND chat.senderID = friendship.userId ) WHERE friendship.userId = ${userId} GROUP BY target.id`
      const sql2 = `SELECT target.id as id, target.roomId as roomId, target.name as name, target.username as username, target.handphone as handphone, target.email as email, target.image as image, target.bio as bio, target.location as location, target.socketId as socketId,
      friendship.status as friendshipStatus FROM friendship LEFT JOIN users as target ON friendship.targetId = target.id WHERE friendship.userId = ${userId}`
      connection.query(sql1, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // GetAllUser
  mSearchUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users where id != ${data.id} AND name LIKE '%${data.searchName}%'`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // Update Detail User
  mPatchUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET ? WHERE id=?`, [data, id],
        (error, result) => {
          if (error) {
            reject(new Error(error))
          } else {
            resolve(result)
          }
        })
    })
  },
  mLogout: (socketId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE socketId like '${socketId}'`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  mAddFriends: (dataUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO friendship SET ?`, dataUser, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  mDeleteFriends: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM friendship WHERE userId = ${data.userId} AND targetId = ${data.targetId}`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}