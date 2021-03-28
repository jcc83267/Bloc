var savedTitle = "";
var savedArtwork = "";
var savedPostUrl = "";

$(document).ready(function(){
  $("#search-game-btn").click(function(){
      event.preventDefault();
    
      const title = document.querySelector('input[name="post-title"]').value;
      const post_url = document.querySelector('input[name="post-url"]').value;
      savedPostUrl = post_url;
      console.log("button clicked.");
      console.log(savedPostUrl);
    
      let apiUrl = "https://api.twitch.tv/helix/games?name=" + title;
    
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Client-ID": "w6k0p7kqfipr0j3xuj55q2z85vrs57",
          "Authorization": "Bearer t3brkytbcv2i1175txe20x1epa3lj6"
        }
      })
        .then(function (response) {
          response.json()
            .then(function (response) {
              console.log(response);
              if (!response.data.length) {
                window.alert("No game found with this title. Please enter valid title.")
              } else {
                $("#createPostModal").modal();
                console.log(response);
                
                let searchedTitle = $("#searched-title")
                  .html(response.data[0].name);
                savedTitle = response.data[0].name;

                let searchedArtworkUrl = response.data[0].box_art_url;
                searchedArtworkUrl = searchedArtworkUrl.split("{");
                searchedArtworkUrl = searchedArtworkUrl[0] + "175x300.jpg";
                savedArtwork = searchedArtworkUrl;
                let searchedArtworkRender = $("#searched-artwork")
                  .attr({
                    src: searchedArtworkUrl
                  })
              }
            });
        });
  });
});

async function newFormHandler(event) {
  event.preventDefault();

  const title = savedTitle;
  const post_url = savedPostUrl;
  const post_content = document.querySelector('input[name="post-content"]').value;
  console.log(title);
  console.log(savedArtwork);
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);


