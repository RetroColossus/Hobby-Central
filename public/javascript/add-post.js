async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const your_hobby = document.querySelector('#your_hobby').value;
    const image_url = document.querySelector('#image_link').value;
    const category = document.querySelector('#category').value;

    const response = await fetch(`/api/hobbies`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        your_hobby,
        category, 
        image_url
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
  
  document.querySelector('.new-hobby-form').addEventListener('submit', newFormHandler);
  