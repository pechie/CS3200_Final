const table_button = document.getElementById('myButton');
table_button.addEventListener('click', function(e) {
  console.log('button was clicked');
  let tableName = document.getElementById('table_name').value;
  console.log("table name: " + tableName);
  const data = {
    "tableName": tableName
  }

  fetch('/table-clicked', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

const log_in_button = document.getElementById("log_in_button");
log_in_button.addEventListener('click', function(e) {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  const data = {
    "username": username,
    "password": password
  }

  fetch('/log-in-clicked', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(function(response) {
      if (response.ok) {
        document.getElementById("current_user").innerHTML = "Current User: " + username;
        document.getElementById("query_button").disabled = false;
        // enable other buttons
        return;
      } else {
        console.log("response" + response);
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

const homeButton = document.getElementById("home_button");
homeButton.addEventListener('click', function(e) {
  window.location.href = "index.html";
});

const queryButton = document.getElementById("query_button");
queryButton.addEventListener('click', function(e) {
  window.location.href = "query.html";
});