const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rate_your_music"
});

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
  con.connect(function(err) {
    // query for given username and email
    con.query("SELECT * FROM users WHERE username = \'" + req.body.username + "\' AND email = \'" + req.body.email + "\'", 
    function (err, result) {
      // send back error if no result is found
      if (err || result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        // ok status
        res.sendStatus(200);
      }
    });
  });
  console.dir(req.body, {depth: null});
});

app.post('/search-1-clicked', (req, res) => {
  console.log("search 1 clicked");
  con.connect(function(err) {
    con.query("SELECT * FROM releases WHERE release_id = " + req.body.release_id, 
    function (err, result) {
      console.log(result);
      if (err || result.length == 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
});

app.post('/search-2-clicked', (req, res) => {
  con.connect(function(err) {
    con.query("SELECT * FROM releases WHERE artist = \'" + req.body.artist + "\' AND title = \'" + req.body.title + "\'", 
    function (err, result) {
      console.log(result);
      if (err || result.length == 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(JSON.stringify(result));
      }
    });
  });
});