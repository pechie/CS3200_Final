const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// add a document to the DB collection recording the click event
app.post('/table-clicked', (req, res) => {
  console.log("clicked post");
  console.dir(req.body, {depth: null});

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "lotrfinal_1"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM lotr_book", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.sendStatus(200);
    });
  });
});

app.post('/log-in-clicked', (req, res) => {
  // connect to database
  // query for user
  console.dir(req.body, {depth: null});
  res.sendStatus(200);
});