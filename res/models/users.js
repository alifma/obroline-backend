// Koneksi Database
const connection = require('../config/database')

// Eksport Module
module.exports = {
  mLogin: () => {
    return
  },
  // Get Detail Users
  mGetDetailUser: (id) => {
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
  }
}