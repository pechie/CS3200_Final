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
  // delete
});

const addButton = document.getElementById("add_button");
addButton.addEventListener('click', function(e) {
  // add
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