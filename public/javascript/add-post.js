let savedTitle = "";
let star_rating = "0";
let post_url = "";

$(document).ready(function () {
  $("#search-game-btn").click(function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;

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

              let searchedTitle = $("#searched-title")
                .html(response.data[0].name);
              savedTitle = response.data[0].name;

              let post_url_setup = response.data[0].box_art_url;
              post_url_setup = post_url_setup.split("{");
              post_url = post_url_setup[0] + "225x300.jpg";
              let searchedArtworkRender = $("#searched-artwork")
                .attr({
                  src: post_url
                })
            }
          });
      });
  });
});

async function newFormHandler(event) {
  event.preventDefault();

  const title = savedTitle;
  const post_content = document.querySelector('textarea[name="post-content"]').value;
  console.log(title);
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_url,
      post_content,
      star_rating
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

function star1() {
  return star_rating = 1
}
function star2() {
  return star_rating = 2
} 
function star3() {
  return star_rating = 3
} 
function star4() {
  return star_rating = 4
} 
function star5() {
  return star_rating = 5
}


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
document.querySelector('#star1').addEventListener('click', star1);
document.querySelector('#star2').addEventListener('click', star2);
document.querySelector('#star3').addEventListener('click', star3);
document.querySelector('#star4').addEventListener('click', star4);
document.querySelector('#star5').addEventListener('click', star5);




