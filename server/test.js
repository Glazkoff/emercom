"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const serveStatic = require("serve-static");
const path = require("path");
const dbConfig = require("./db.config.js");
// Ниже добавленные импорты
const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const CONFIG = require('./secret.config')

const app = express();

// Парсинг json - application/json
app.use(bodyParser.json());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Обработка статических файлов
app.use("/", serveStatic(path.join(__dirname, "../dist")));

// настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
});
try {
  connection.connect((err) => {
    if (err) {
      console.warn(err);
    } else {
      console.log(`Успешно соединено с базой данных ${dbConfig.HOST}`);
      connection.query('SET NAMES "utf8"');
      connection.query('SET CHARACTER SET "utf8"');
      connection.query('SET SESSION collation_connection = "utf8_general_ci"');
    }
  });
} catch (err) {
  console.warn(err);
}

/**************************************************************** */
let salt = bcrypt.genSaltSync(10);
// app.use(
//   session({
//     secret: "NiKiTa",
//     store: new FileStore(),
//     cookie: {
//       path: "/",
//       httpOnly: true,
//       maxAge: 60 * 60 * 1000,
//     },
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.post('/api/register', (req, res) => {
  console.log(req.body);
  if ((req.body.login == undefined) || (req.body.password == undefined)) {
    return res.status(500).send("Проблема при регистрации пользователя!")
  }
  let login = req.body.login;
  let password = bcrypt.hashSync(req.body.password, salt);
  connection.query('INSERT INTO `users` (fio, role, department_id, login, password) VALUES (?, ?, ?, ?, ?)', ["Глазков Никита Олегович", "admin", 0, login, password], (err, result) => {
    if (err) {
      console.warn('ОШИБКА');
      console.log(err);
      return res.status(500).send("Проблема при регистрации пользователя")
    } else {
      console.log(result);
      connection.query('SELECT * FROM `users` WHERE login = ?', [login], (error, reslt) => {
        if (error) {
          console.warn('ОШИБКА');
          console.log(err);
          return res.status(500).send("Проблема получении пользователя")
        } else {
          console.log(reslt);
          let token = jwt.sign({
              id: reslt.insertId
            },
            CONFIG.SECRET, {
              expiresIn: 86400 // токен на 24 часа  
            });
          res.status(200).send({
            token,
            fio: reslt[0].fio,
            login: login
          })
        }
      })
    }



  })
})

app.post('/api/login', (req, res) => {
  connection.query('SELECT * FROM `users` WHERE login = ?', [req.body.login], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Ошибка на сервере")
    } else {
      if (!result[0]) {
        res.status(404).send("Пользователь не найден")
      }
      let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password)
      if (!passwordIsValid) {
        return res.status(401).send({
          token: null
        })
      } else {
        let token = jwt.sign({
          id: result[0].user_id
        }, CONFIG.SECRET, {
          expiresIn: 86400 // токен на 24 часа 
        })
        res.status(200).send({
          token,
          fio: result[0].fio,
          login: req.body.login
        });
      }

    }
  })
})
//*************************************** */
//************** Ниже API *************** */
//*************************************** */

// Обработка прямого пути
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Запуск сервера на порту PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});