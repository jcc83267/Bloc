async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

async function twitchFormHandler(event){
  event.preventDefault();
  console.log("cdasdasd")
  const response = fetch(`/api/twitch/login`, {
    method: 'GET',
  })
  .then((response) => response.json())
      .then(function (response) {
        console.log(response)
        
})
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('.twitch-button-container').addEventListener('click', twitchFormHandler);