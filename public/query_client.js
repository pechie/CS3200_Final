let current_release_id = 0;

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
    if (response.status && response.status == 404) {
      document.getElementById("result").innerHTML = "Release not found, please try again";
      return;
    } else {
      let release_info = await response.json();
      document.getElementById("result").innerHTML = "Found release: " + JSON.stringify(release_info[0]);
      current_release_id = releaseId;
      return;
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});

const searchButton2 = document.getElementById("search_button_2");
searchButton2.addEventListener('click', function(e) {
  let artist = document.getElementById("artist").value;
  let title = document.getElementById("title").value;

  const data = {
    "artist": artist,
    "title": title
  }

  fetch('/search-2-clicked', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(async function(response) {
    if (response.status && response.status == 404) {
      document.getElementById("result").innerHTML = "Release not found, please try again";
      return;
    } else {
      let release_info = await response.json();
      document.getElementById("result").innerHTML = "Found release: " + JSON.stringify(release_info[0]);
      return;
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});

function getCurrentReleaseId() {
  return this.current_release_id;
}

export {getCurrentReleaseId}