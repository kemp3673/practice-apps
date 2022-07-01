const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // USERS TABLE:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, street VARCHAR(255), city VARCHAR(50), zipcode INT(5), state VARCHAR(2), session_id INT)")
  )
  .then(() =>
    // PAYMENTS TABLE:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS payments (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nameID INT NOT NULL, card INT(20), zipcode INT(5), cvv INT(3), exp_date DATE, FOREIGN KEY (nameID) REFERENCES users (id))")
  )
  .catch((err) => console.log(err));



db.get()
      .then(() => console.log(`Inside GET @ DB`))
      .then(() => db.queryAsync(
                    "SELECT * FROM users"
      )

module.exports = db;
