const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const serveStatic = require("serve-static");
const path = require("path");
const dbConfig = require("./db.config.js");

const app = express();

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

// Обработка прямого пути
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// настройка CORS
app.use(function(req, res, next) {
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

// Запуск сервера на порту PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
