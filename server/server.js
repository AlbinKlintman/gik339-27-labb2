const express = require("express");
const server = express();
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

 server.listen(3000, () =>
  console.log('running server on http://localhost:3000') 
 );

 server.get("/users", (req, res) => {
  const db = new sqlite3.Database('./gik339-labb2.db');
 });

 const sqlite3 = require("sqlite3").verbose();

 db.all('SELECT * FROM USERS', (err, rows) => {
  res.status(500).send(err);
  res.send(rows);
 });