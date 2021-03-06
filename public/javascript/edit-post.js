async function editFormHandler(event) {
  event.preventDefault();

  // const post_content = document.querySelector('input[name="post-content"]').value.trim();
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.assign("/dashboard")
  } else {
    alert(response.statusText);
  }
}


document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);