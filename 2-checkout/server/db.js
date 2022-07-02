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
      "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, street VARCHAR(255), addLine2 VARCHAR(255), city VARCHAR(50), zipcode INT(5), state VARCHAR(2), phone INT(10), session_id INT)")
  )
  .then(() =>
    // PAYMENTS TABLE:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS payments (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nameID INT NOT NULL, card INT(20), billZipcode INT(5), cvv INT(3), exp_date DATE, FOREIGN KEY (nameID) REFERENCES users (id))")
  )
  .catch((err) => console.log(err));


db.get = async(data) => {
  try {
      console.log('name: ', data)
      return await db.queryAsync(`SELECT * FROM users LEFT JOIN payments ON users.id = payments.nameID WHERE users.name = "${data.name}"`)
    }
  catch(err) {
      return err;
    }
};


db.create = async(data) => {
  if (data.password) {
    try {
      return db.queryAsync(`INSERT INTO users (name, email, password) SELECT * FROM ( SELECT "${data.name}", "${data.email}", "${data.password}") AS tmp WHERE NOT EXISTS (SELECT name FROM users WHERE name="${data.name}")`)
    }
    catch(err) {
      return err;
    }
  } else if (data.street){
    try {
      let addLine2 = null;
      if (data.addLine2) {
        addLine2=`"${data.addLine2}"`;
      }
      return db.queryAsync(`UPDATE users SET street="${data.street}", addLine2=${addLine2}, city="${data.city}", zipcode="${data.zipcode}", state="${data.state}", phone="${data.phone}" WHERE name  = "${data.name}"`)
    }
    catch(err) {
      return err;
    }
  } else if (data.card) {
    try {
      return db.queryAsync(`INSERT INTO payments (nameID, card, billZipcode, cvv, exp_date) VALUES ((SELECT id FROM users WHERE name="${data.name}"), "${data.card}", "${data.zipcode}", "${data.cvv}", "${data.expDate}")`)
    }
    catch(err) {
      return err;
    }
  }
}




// Replace @var with ? and have the order passed in match

module.exports = db;
