"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const serveStatic = require("serve-static");
const path = require("path");
const dbConfig = require("./db.config.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONFIG = require("./secret.config");

const app = express();
const expressWs = require("express-ws")(app);

// Парсинг json - application/json
app.use(bodyParser.json());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Обработка статических файлов
app.use("/", serveStatic(path.join(__dirname, "../dist")));

// настройка CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// создаем соединение с нашей базой данных
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   charset: "utf8_general_ci"
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connection.query('SET NAMES "utf8"');
    connection.query('SET CHARACTER SET "utf8"');
    connection.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }

  if (connection) connection.release();
  // return
});

// try {
//   connection.connect(err => {
//     if (err) {
//       console.warn(err);
//     } else {
//       console.log(`Успешно соединено с базой данных ${dbConfig.HOST}`);
//       connection.query('SET NAMES "utf8"');
//       connection.query('SET CHARACTER SET "utf8"');
//       connection.query('SET SESSION collation_connection = "utf8_general_ci"');
//     }
//   });
// } catch (err) {
//   console.warn(err);
// }

let salt = bcrypt.genSaltSync(10);

/********************************************* */
/***************** Ниже API ****************** */
/********************************************* */

// Обработка запросов протокола WebSockets
app.ws("/ws", function(ws, req) {
  ws.on("message", function(msg) {
    console.log(ws);
    console.log("WS:", msg);
    ws.send(msg);
  });
});

// Обработка прямого пути
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Обработка регистрации
app.post("/api/register", (req, res) => {
  console.log(req.body);
  if (req.body.login == undefined || req.body.password == undefined) {
    return res.status(500).send("Проблема при регистрации пользователя!");
  }
  let login = req.body.login;
  let password = bcrypt.hashSync(req.body.password, salt);
  pool.query(
    "INSERT INTO `users` (fio, role, department_id, login, password) VALUES (?, ?, ?, ?, ?)",
    ["Глазков Никита Олегович", "admin", 0, login, password],
    (err, result) => {
      if (err) {
        console.warn("ОШИБКА");
        console.log(err);
        return res.status(500).send("Проблема при регистрации пользователя");
      } else {
        console.log(result);
        pool.query(
          "SELECT * FROM `users` WHERE login = ?",
          [login],
          (error, reslt) => {
            if (error) {
              console.warn("ОШИБКА");
              console.log(err);
              return res.status(500).send("Проблема получении пользователя");
            } else {
              console.log(reslt);
              let token = jwt.sign(
                {
                  id: reslt.insertId,
                },
                CONFIG.SECRET,
                {
                  expiresIn: 86400, // токен на 24 часа
                }
              );
              res.status(200).send({
                token,
                fio: reslt[0].fio,
                login: login,
              });
            }
          }
        );
      }
    }
  );
});

// Обработка авторизации
app.post("/api/login", (req, res) => {
  console.log("LOGIN", req.body);
  // if (connection)
  pool.query(
    "SELECT * FROM `users` WHERE login = ?",
    [req.body.login],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Ошибка на сервере");
      } else {
        if (!result[0]) {
          res.status(404).send("Пользователь не найден");
        } else {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            result[0].password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              token: null,
            });
          } else {
            let token = jwt.sign(
              {
                user_id: result[0].user_id,
                department_id: result[0].department_id,
                role: result[0].role,
              },
              CONFIG.SECRET,
              {
                expiresIn: 86400, // токен на 24 часа
              }
            );
            res.status(200).send({
              token,
              fio: result[0].fio,
              login: req.body.login,
              department_id: result[0].department_id,
              user_id: result[0].user_id,
            });
          }
        }
      }
    }
  );
});

//CRUD: requests
app.post("/api/requests", (req, res) => {
  console.log(req.body);
  try {
    pool.query(
      "INSERT INTO `requests` ( `status`, `user_id`, `department_id`, `content`, `comment` ) VALUES (?, ?, ?, ?, ?)",
      [
        "На рассмотрении",
        req.body.user_id,
        req.body.department_id,
        JSON.stringify(req.body.checked_devices),
        req.body.common_comment,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Ошибка на сервере");
        } else {
          console.log("Результат запроса к БД:");
          console.log(result);
          res.send(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/requests", (req, res) => {
  try {
    jwt.verify(req.headers["authorization"], CONFIG.SECRET, function(
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).send({
          auth: false,
          message: "Ошибка аутентификации токена",
        });
      } else {
        console.log("GET");
        try {
          if (req.query.common) {
            pool.query("SELECT * FROM `requests`", (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Ошибка на сервере");
              } else {
                console.log("Результат запроса к БД:");
                console.log(result);
                res.json(result);
              }
            });
          } else {
            console.log(decoded);
            pool.query(
              "SELECT * FROM `requests` WHERE department_id = ?",
              [decoded.department_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Ошибка на сервере");
                } else {
                  console.log("Результат запроса к БД:");
                  console.log(result);
                  res.json(result);
                }
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
// TODO: add put requests
// app.put("/api/requests", (req, res) => { });

app.delete("/api/requests/:id", (req, res) => {
  jwt.verify(req.headers["authorization"], CONFIG.SECRET, function(
    err,
    decoded
  ) {
    if (err) {
      return res.status(401).send({
        auth: false,
        message: "Ошибка аутентификации токена",
      });
    } else {
      console.log("GET");
      try {
        pool.query(
          "DELETE FROM `requests` WHERE request_id = ?",
          [req.params.id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Ошибка на сервере");
            } else {
              console.log("Результат запроса к БД:");
              console.log(result);
              res.json(result);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  });
});

// CRUD: messages
app.post("/api/messages", (req, res) => {
  // if (connection) {
  try {
    pool.query(
      "INSERT INTO `messages` ('title', 'body', 'from_user_id', 'destination_id', 'type') VALUES (?, ?, ?, ?, ?)",
      [
        req.body.title,
        req.body.body,
        req.body.fromid,
        req.body.toid,
        req.body.status,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Ошибка на сервере");
        } else {
          console.log("Результат запроса к БД:");
          console.log(result);
          res.send(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // }
});

app.get("/api/messages", (req, res) => {
  if (req.headers["authorization"]) {
    try {
      jwt.verify(req.headers["authorization"], CONFIG.SECRET, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(401).send({
            auth: false,
            message: "Ошибка аутентификации токена",
          });
        } else {
          console.log(decoded);
          console.log("GET");
          try {
            if (req.query.common) {
              pool.query(
                "SELECT * FROM `messages` WHERE broadcast = 'common'",
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Ошибка на сервере");
                  } else {
                    console.log("Результат запроса к БД:");
                    console.log(result);
                    res.json(result);
                  }
                }
              );
            } else if (req.query.personal) {
              console.log(
                "PERSONAL ",
                jwt.verify(req.headers["authorization"], CONFIG.SECRET).user_id
              );
              pool.query(
                "SELECT * FROM `messages` WHERE broadcast = 'personal' AND destination_id = ?",
                [
                  jwt.verify(req.headers["authorization"], CONFIG.SECRET)
                    .user_id,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Ошибка на сервере");
                  } else {
                    console.log("Результат запроса к БД:");
                    console.log(result);
                    res.json(result);
                  }
                }
              );
            } else {
              pool.query("SELECT * FROM `messages`", (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Ошибка на сервере");
                } else {
                  console.log("Результат запроса к БД:");
                  console.log(result);
                  res.json(result);
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).send({
      auth: false,
      message: "Нет токена!",
    });
  }
  // if (connection) {

  // }
});

// TODO: add put messages
// app.put("/api/messages", (req, res) => { });

// TODO: add delete messages
// app.delete("/api/messages", (req, res) => { });

app.get("/test", (req, res) => {
  console.log(req.headers);
  if (req.headers["authorization"]) {
    let decode;
    try {
      decode = jwt.verify(req.headers["authorization"], CONFIG.SECRET);
    } catch (err) {
      console.log(err);
    }
    console.log(decode);
    res.status(200).send({
      id: decode.id,
    });
  } else {
    res.status(401).send("Токен не найден!");
  }
});

// Запуск сервера на порту PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
