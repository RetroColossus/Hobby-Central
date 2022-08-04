async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log(id);

    const response = await fetch(`/api/hobbies/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-hobby-btn').addEventListener('click', deleteFormHandler);