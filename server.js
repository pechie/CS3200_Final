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

app.post('/add-update-review', (req, res) => {
  con.connect(function(err) {
    con.query("SELECT * FROM reviews WHERE reviews.release = " + req.body.release_id + " AND reviews.user = '" + req.body.username + "'",
    function(err, result) {
      if (!result || result.length == 0) {
        // add review
        let newReleaseId = 0;
        con.query("SELECT MAX(reviews_id) FROM reviews", function(err, result) {
          if (!err) {
            newReleaseId = result[0]['MAX(reviews_id)'] + 1;
            con.query("INSERT INTO reviews "
            + "values (" + newReleaseId + ",'" + req.body.username + "'," 
            + req.body.release_id + "," + req.body.rating + ",'" + req.body.comments + "')",
            function(err, result) {
              if (err) {
                console.log(err);
                res.sendStatus(404);
              } else {
                res.sendStatus(200);
              }
            });
          }
        });
      } else {
        // update review
        let reviewId = result[0].reviews_id;
        con.query("UPDATE reviews SET reviews.rating = " + req.body.rating 
        + ", reviews.comments= '" + req.body.comments + "' "
        + "WHERE reviews.reviews_id = " + reviewId,
        function(err, result) {
          if (err) {
            console.log(err);
            res.sendStatus(404);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  });
});

app.post('/delete-review', (req, res) => {
  con.connect(function(err) {
    con.query("DELETE FROM reviews WHERE reviews.user = '" 
    + req.body.username + "' AND reviews.release = " + req.body.release_id, 
    function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });
});