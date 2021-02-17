const { login, register, patchUser } = require('../controllers/users')
const { singleUpload } = require('../helpers/upload')
const express = require('express')

const route = express.Router()
route
  .post('/api/login', login)
  .post('/api/register', register)
  .patch('/api/user/:id', singleUpload, patchUser)

module.exports = route