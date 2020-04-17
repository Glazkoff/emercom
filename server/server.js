const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const passport = require('passport')
const session = require('express-session')
const fileStore = require('session-file-store')(session)

const app = express()

// var corsOptions = {
//   origin: 'http://localhost:8081'
// }
// app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(express.urlencoded({
  extended: false
}))

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to bezkoder application.'
  })
})

// const pool = mysql.createPool({
//   connectionLimit: 5,
//   host: "localhost",
//   user: "root",
//   database: "usersdb2",
//   password: ""
// });



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
