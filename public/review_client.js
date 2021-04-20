const homeButton = document.getElementById("home_button");
homeButton.addEventListener('click', function(e) {
  window.location.href = "index.html";
});

document.getElementById("current_id").innerHTML = 
  "Review for " 
  + sessionStorage.getItem("title")
  + " by "
  + sessionStorage.getItem("artist");


const deleteButton = document.getElementById("delete_button");
deleteButton.addEventListener('click', function(e) {
  let rating = document.getElementById("rating").value;
  let comments = document.getElementById("comments").value;

  const data = {
    "rating": rating,
    "comments": comments
  }

  // change route to delete-review
  fetch('/add-update-review', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async function(response) {
    if (response.status && response.status == 404) {
      // error
      return;
    } else {
      // let release_info = await response.json();
      return;
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});

const addButton = document.getElementById("add_button");
addButton.addEventListener('click', function(e) {
  let rating = document.getElementById("rating").value;
  let comments = document.getElementById("comments").value;

  const data = {
    "username": sessionStorage.getItem("username"),
    "release_id": sessionStorage.getItem("release_id"),
    "rating": rating,
    "comments": comments
  }

  fetch('/add-update-review', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async function(response) {
    if (response.status && response.status == 404) {
      // error
      return;
    } else {
      // let release_info = await response.json();
      return;
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});

$('#rating').bind('keyup', function() {
  if ($('#rating').val() != '') {
    $('#delete_button').removeAttr('disabled');
    $('#add_button').removeAttr('disabled');
  } else {
    $('#delete_button').attr('disabled', 'disabled');
    $('#add_button').attr('disabled', 'disabled');
  }
});