async function editFormHandler(event) {
  event.preventDefault();
    
  const title = document.querySelector('#title').value;
  const your_hobby = document.querySelector('#your_hobby').value;
  const image_url = document.querySelector('#image_link').value;
  const category = document.querySelector('#category').value;

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    
    const response = await fetch(`/api/hobbies/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        your_hobby,
        image_url,
        category
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-hobby-form').addEventListener('submit', editFormHandler);
  