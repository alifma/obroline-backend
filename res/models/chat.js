// Koneksi Database
const connection = require('../config/database')

// Eksport Module
module.exports = {
  mGetChat: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT chat.senderId as senderId,  chat.created_at as created_at, target.socketId as socketId, chat.targetId as targetId, chat.message as message, sender.name as senderName, sender.roomId as senderRoomId, target.roomId as targetRoomId FROM chat LEFT JOIN users as sender ON chat.senderId=sender.id LEFT JOIN users as target ON chat.targetId = target.id
      WHERE 
      (senderId='${data.senderId}' AND targetId='${data.targetId}') 
      OR 
      (senderId='${data.targetId}' AND targetId='${data.senderId}')`
      connection.query(sql,  (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  mDetailChat: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM chat WHERE id = ${id}`
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  mSendChat: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO chat (senderId, targetId, message) VALUES  (${data.senderId},${data.targetId},'${data.msg}')`
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}