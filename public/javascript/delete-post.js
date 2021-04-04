async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.assign("/dashboard")
    
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.btn-delete').addEventListener('click', deleteFormHandler);