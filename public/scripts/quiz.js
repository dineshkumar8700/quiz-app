globalThis.onload = () => {
  const submitBtn = document.querySelector('form button')  
  submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    alert('Hello World')
  })
};
