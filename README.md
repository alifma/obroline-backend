# Obroline-Backend
Repository for Backend of RealTime Chatting Application built using ExpressJS & SocketIO.
The build version of Obroline-Frontend already stored on this repository.

## Deployment
> You can try this application [Here](http://52.91.116.102:4000)

## Installation
1. Clone this repository
2. Install Required NPM Packages 
   > `npm install`
3. Create database named `obroline` and import `obroline.sql` from this project folder
4. Create `.env` files with this value
   > - PORT= (Your decided port number, ex:4000)
   > - DB_USERNAME= (Your Database User)
   > - DB_PASSWORD= (Your Database Password)
   > - DB_NAME= obroline
   > - JWT_SECRET= (Your own JWT)
5. Dont forget to install Nodemon
6. Start Application
   > `npm start` OR `nodemon`

## Features
- JWT Authentication
- Upload Image Using Multer
- Maps Location
- Realtime Chat using SocketIO

## NPM Packages Used
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Connect-history-api-fallback](https://www.npmjs.com/package/coonnect-history-api-fallback)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)

## Will Be Added Soon
- Reset Password
- Email Account Verification