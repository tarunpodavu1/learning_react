//Synchronous code
const header = document.getElementById("heading");
header.innerHTML = "Hey!";
//First we have the header assigned and then we change the inner html, until then the program is blocked.
//Means it works synchronously, while each operation is happening, nothing else is happening

//Asynchronous Code
//Some tasks have to wait for some work to finish before they can be completed like accessing DB, stream video, or audio 
//Or we might need to fetch an API
//With JS, asynchronous task do not block the main thread. JS is free to do something else while we wait for the API to return data

//Using fetch

console.log(fetch("https://api.randomuser.me/?nat=US&results=1")); //returns promise, whether its pending or failed

//Chaining with .then
//