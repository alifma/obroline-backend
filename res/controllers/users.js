const bcrypt = require('bcrypt')
const { mRegister, mCheckEmail, mPatchUser, mDetailUser, mAddUser } = require('../models/users')
const jwt = require('jsonwebtoken')
// Response Helper 
const { error, success } = require('../helpers/response')
// Remove File Operation
const fs = require('fs')

module.exports = {
  login : (req, res) => {
    const body = req.body
    try {
      if (body.email && body.password) {
        mCheckEmail(body.email)
        .then(async (response)=>{
          if(response.length == 1){
            const checkPassword = await bcrypt.compare(body.password, response[0].password)
            if(checkPassword) {
              const dataUser = {
                email: response[0].email,
                id: response[0].id,
                name: response[0].name
              }
              const jwttoken = jwt.sign(dataUser, process.env.JWT_SECRET)
              success(res, 200, 'Login Success', {user: response[0], token: jwttoken})
            }else{
              error(res, 400, 'Login Failed', 'Wrong Password')
            }
          }else{
            error(res, 400, 'Login Failed', 'Email is not registered')
          }
        })
        .catch((err)=> error(res, 400, 'Login Failed', err.message))
      } else {
        error(res, 500, 'Empty Field Found', 'Please Fill All Data')
      }
    } catch {
      error(res, 500, 'Internal Server Error', '')
    }
  },
  register : async (req, res) => {
    const body = req.body
    try {
      if (body.email && body.password && body.name ) {
        mCheckEmail(body.email)
        .then(async (response)=>{
          if(response.length >= 1) {
            error(res, 400, 'Registration Failed', 'Email already registered')
          }else{
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(body.password, salt)
            const genRoomId = `OL-${(body.name).substring(0,5)}${Math.floor(Math.random() * 100)}`
            const user = {
              roomId: genRoomId,
              name: body.name,
              username: body.email,
              email: body.email,
              image: 'default.png',
              location: '0,0',
              bio: '-',
              password
            }
            mRegister(user)
            .then(()=> success(res, 200, 'Registration Success', {}))
            .catch((err)=> error(res, 400, 'Registration Failed2', err.message))
          }
        })
        .catch((err)=> error(res, 400, 'Registration Failed1', err.message))
      } else {
        error (res, 400, 'Empty Field Found', 'Please Fill All Data') 
      }
    } catch {
      error(res, 500, 'Internal Server Error', '')
    }
  },
  patchUser: async(req, res) => {
    try {
      const id = req.params.id
      const data = req.body
      if (req.file || data.name || data.username || data.handphone || data.email || data.bio || data.location) {
        let dataUpdate = {}
        // Kalau ada file, maka Imagenya dibawa
        if (req.file) {
          dataUpdate = {
            ...data,
            image: req.file.filename
          }
          mDetailUser(id)
            .then((res) => {
              if (res[0].image !== 'default.png') {
                fs.unlinkSync(`./public/img/${res[0].image}`)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          dataUpdate = {
            ...data
          }
        }
        mPatchUser(dataUpdate, id)
          .then((response) => {
            if (response.affectedRows != 0) {
              success(res, 200, 'Patch data Success', {}, {})
            } else {
              if (req.file) {
                fs.unlinkSync(`./public/img/${req.file.filename}`)
              }
              error(res, 400, 'Nothing Patched, Wrong ID', {}, {})
            }
          })
          .catch((err) => {
            if (req.file) {
              fs.unlinkSync(`./public/img/${req.file.filename}`)
            }
            error(res, 400, 'Wrong Data Type Given', err.message, {})
          })
      } else {
        error(res, 400, 'Nothing Patched, No Data Given', 'Empty Data', {})
      }
    } catch (err) {
      if (req.file) {
        fs.unlinkSync(`./public/img/${req.file.filename}`)
      }
      error(res, 500, 'Internal Server Error', err.message, {})
    }
  },
  detailUser: (req, res) => {
    const id = req.params.id
    mDetailUser(id)
      .then((response) => {
        success(res, 200, 'Display Data Success', {},  response)
      })
      .catch((err) => {
        error(res, 500, 'Internal Server Error', err.message, {})
      })
  }
}
