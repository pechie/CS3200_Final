const log_in_button = document.getElementById("log_in_button");
log_in_button.addEventListener('click', function (e) {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;

  const data = {
    "username": username,
    "email": email
  }

  fetch('/log-in-clicked', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (response) {
    if (response.ok) {
      document.getElementById("current_user").innerHTML = "Current User: " + username;
      document.getElementById("add_button").disabled = false;
      document.getElementById("query_button").disabled = false;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      return;
    } else {
      document.getElementById("current_user").innerHTML = "Invalid login information, please try again";
      return;
    }
  })
    .catch(function (error) {
      console.log(error);
    });
});

const userButton = document.getElementById('add_button');
userButton.addEventListener('click', (e) => {
  window.location.href = 'user.html';
});

const queryButton = document.getElementById("query_button");
queryButton.addEventListener('click', function (e) {
  window.location.href = "query.html";
});
