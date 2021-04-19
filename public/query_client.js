const homeButton = document.getElementById("home_button");
homeButton.addEventListener('click', function(e) {
  window.location.href = "index.html";
});

const searchButton1 = document.getElementById("search_button_1");
searchButton1.addEventListener('click', function(e) {
  let releaseId = document.getElementById("release_id").value;

  const data = {
    "release_id": releaseId
  }

  fetch('/search-1-clicked', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async function(response) {
    let release_info = await response.json();
      if (response.status && response.status == 404) {
        document.getElementById("result").innerHTML = "Release not found, please try again";
        return;
      } else {
        document.getElementById("result").innerHTML = "Found release: " + JSON.stringify(release_info[0]);
        return;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

const searchButton2 = document.getElementById("search_button_2");
searchButton2.addEventListener('click', function(e) {
  let releaseId = document.getElementById("release_id").value;

  const data = {
    "release_id": releaseId
  }

  fetch('/search-2-clicked', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(function(response) {
    console.log(response);
      if (response.status && response.status == 404) {
        document.getElementById("result").innerHTML = "Release not found, please try again";
        return;
      } else {
        document.getElementById("result").innerHTML = "Should be working";
        return;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});