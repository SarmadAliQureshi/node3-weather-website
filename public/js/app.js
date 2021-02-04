const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
console.log('client side js file')

fetch('http://puzzle.mead.io/puzzle').then(function(response){
    response.json().then((data)=>{
        console.log(data);
    })
})




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = 'Loading....'
    console.log('testing', address.value)
    // url = `http://localhost:3000/weather?address=${address.value}`
    url = `/weather?address=${address.value}`

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message2.textContent=''
            console.log(data.error);
            message1.textContent = data.error
        }
        else{
        message1.textContent=''
        const cont =  data.forecast + ' degrees in ' + data.address
        console.log(data)
        message2.textContent = cont
        }
    })
})
})