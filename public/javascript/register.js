function sendemail(email) {
  console.log(email)
  const response = fetch(`/api/emailRegister`, {
    method: 'POST',
    body: JSON.stringify({
      email
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
    })
    return
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      sendemail(email);
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}




document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
