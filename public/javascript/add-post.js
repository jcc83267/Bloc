async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]').value;
  console.log("button clicked.");
  
  let apiUrl = "https://api.twitch.tv/helix/games?name=" + title;
    
  await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Client-ID": "w6k0p7kqfipr0j3xuj55q2z85vrs57",
      "Authorization": "Bearer t3brkytbcv2i1175txe20x1epa3lj6"
    }
    })
      .then(function(response) {
          response.json()
            .then(function(response) {
              console.log(response);
              if (!response.data.length) {
                window.alert("No game found with this title. Please enter valid title.")
              } else {
                console.log(response);
                console.log(response.data[0].name);
                console.log(response.data[0].box_art_url);

                let boxArtUrl = response.data[0].box_art_url;
                let officialArtwork = boxArtUrl.split("{");
                officialArtwork = officialArtwork[0] + "275x400.jpg"
                console.log(officialArtwork);
              }
            });
      });
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
