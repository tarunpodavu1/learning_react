//Normal Arrays and accessing 
const animals = ['horse', 'mouse', 'cat'];
// console.log(animals[1]);

//With Array destructuring we can take an individual element and assign it a variable in one line

const [firstAnimal] = ['horse', 'mouse', 'cat'];
console.log(firstAnimal);   //horse

//We can skip elements with list matching commas and have other elements assigned
const [, , lastAnimal] = ['horse', 'mouse', 'cat'];
console.log(lastAnimal);    //cat