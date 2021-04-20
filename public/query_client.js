const homeButton = document.getElementById("home_button");
homeButton.addEventListener('click', function(e) {
  window.location.href = "index.html";
});

const reviewButton = document.getElementById("review_button");
reviewButton.addEventListener('click', function(e) {
  window.location.href = "review.html";
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
      document.getElementById("review_button").disabled = false;
      sessionStorage.setItem("release_id", releaseId);
      sessionStorage.setItem("artist", release_info[0].artist);
      sessionStorage.setItem("title", release_info[0].title);
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
      sessionStorage.setItem("artist", artist);
      sessionStorage.setItem("title", title);
      document.getElementById("result").innerHTML = "Found release: " + JSON.stringify(release_info[0]);
      return;
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});
