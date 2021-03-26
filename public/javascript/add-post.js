async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]').value;
  console.log("button clicked.");

  // var getUserRepos = function(user) {
  //   // format the github api url
  //   var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
  //   // make a request to the url
  //   fetch(apiUrl).then(function(response) {
  //     response.json().then(function(data) {
  //       console.log(data);
  //     });
  //   });
  // };
  
  let apiUrl = "https://api.twitch.tv/helix/games?name=" + title;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Client-ID": "w6k0p7kqfipr0j3xuj55q2z85vrs57",
      "Authorization": "Bearer t3brkytbcv2i1175txe20x1epa3lj6"
    }
    })
      .then(function(response) {
        response.json()
          .then(function(data) {
            console.log(data);
          });
      });

  

  // const response = await fetch(`/api/posts`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     title,
  //     post_url,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (response.ok) {
  //   document.location.replace("/dashboard");
  // } else {
  //   alert(response.statusText);
  // }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
