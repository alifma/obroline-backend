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
  // Get All User
  mAllUser: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE id != ${userId}`, (err, result) => {
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
}