const homeButton = document.getElementById("home_button");
homeButton.addEventListener('click', function (e) {
  window.location.href = "index.html";
});

const addUser = document.getElementById('add_user');
addUser.addEventListener('click', (e) => {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let bio = document.getElementById('bio').value;

  const data = {
    'username': username,
    'email': email,
    'bio': bio
  }

  fetch('/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(async function (response) {
    if (response.status && response.status == 404) {
      return;
    } else {
      return;
    }
  }).catch((err) => {
    console.log(err);
  });
});


$('#username').bind('keyup', function () {
  if ($('#username').val() != '') {
    $('#add_user').removeAttr('disabled');
  } else {
    $('#add_user').attr('disabled', 'disabled');
  }
});