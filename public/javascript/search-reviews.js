$(document).ready(function () {
  $("#search-review-btn").click(function (event) {
    event.preventDefault();
    const searchedTitle = document.querySelector('input[name="searched-title"]').value;
    console.log("search button clicked");
    document.location.replace(`/reviews/${searchedTitle}`);
  });
});
