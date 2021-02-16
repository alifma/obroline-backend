const { login, register } = require('../controllers/users')
const express = require('express')

const route = express.Router()
route
  .post('/api/login', login)
  .post('/api/register', register)

module.exports = route