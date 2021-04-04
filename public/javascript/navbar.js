$(document).ready(function () {
  $("#search-review-btn").click(function (event) {
    event.preventDefault();
    const searchedTitle = document.querySelector('input[name="searched-title"]').value;
    if(!searchedTitle) {
      window.alert("Please enter a title.")
      window.location.replace('/')
    }
    const response = fetch(`/api/twitch/${searchedTitle}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(function (response) {
        if (!response.data.length) {
          window.alert("No game found with this title. Please enter valid title.")
          window.location.replace('/')
        } else {
          console.log("search button clicked");
          document.location.replace(`/reviews/${searchedTitle}`);
        }
      });
  });

  $(".btn-my-blocs").click(function (event) {
    event.preventDefault();
    console.log("my blocs button clicked");
    document.location.replace(`/dashboard`);
  });

  $(".btn-sign-in").click(function (event) {
    event.preventDefault();
    console.log("log in button clicked");
    document.location.replace(`/login`);
  });

  $(".btn-register").click(function (event) {
    event.preventDefault();
    console.log("register button clicked");
    document.location.replace(`/register`);
  });

  
});

