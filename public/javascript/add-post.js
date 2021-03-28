$(document).ready(function(){
  $("#search-game-btn").click(function(){
      event.preventDefault();
    
      const title = document.querySelector('input[name="post-title"]').value;
      const post_content = document.querySelector('input[name="post-content"]').value;
      console.log("button clicked.");
    
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
                console.log(response.data[0].name);
                console.log(response.data[0].box_art_url);
                
                let searchedTitle = $("#searched-title")
                  .html(response.data[0].name);

                let searchedArtworkUrl = response.data[0].box_art_url;
                searchedArtworkUrl = searchedArtworkUrl.split("{");
                searchedArtworkUrl = searchedArtworkUrl[0] + "175x300.jpg"
                let searchedArtworkRender = $("#searched-artwork")
                  .attr({
                    src: searchedArtworkUrl
                  });
              }
            });
        });
  });
});


