const { login, register, patchUser, detailUser } = require('../controllers/users')
const { singleUpload } = require('../helpers/upload')
const { authentication } = require('../helpers/auth')
const express = require('express')

const route = express.Router()
route
  .post('/api/login', login)
  .post('/api/register', register)
  .patch('/api/user/:id', authentication, singleUpload, patchUser)
  .get('/api/user/:id', authentication, detailUser)

module.exports = route