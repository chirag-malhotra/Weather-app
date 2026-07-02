const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const address = searchElement.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = `Location : ${data.location}`;
            messageTwo.textContent = `Forecast: ${data.forecast}`;
        }
        
    }).catch((err) =>{
        console.log(err);
    })
})