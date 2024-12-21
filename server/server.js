const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();
console.log('början av veb severn');
server
 .use(express.json())
 .use(express.urlencoded({ extended: false }))
 .use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');

  next();
 });

 server.get("/users", (req, res) => {
  res.send("Welcome to the server!");
  const db = new sqlite3.Database("./gik339-labb2.db", (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      res.status(500).send({ error: "Failed to connect to the database." });
      return;
    }
  });

  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error executing SQL query:", err.message);
      res
        .status(500)
        .send({ error: "Failed to fetch data from the database." });
      return;
    }

    res.json(rows);
  });

  db.close((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    }
  });
 });

 server.listen(3000, () => {
   console.log("Running server on http://localhost:3000");
 });
