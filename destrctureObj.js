//Example of destructuring object
const sandwich = {
    bread: "cruch",
    meat : "tuna",
    cheese : "swiss",
    toppings: ["lettuce", "tomato", "mustard"]
};

const {bread, meat} = sandwich;
// console.log(bread, meat);
//*************************** */
//We can also destructure function arguments
//Lets see in the example

// const lordify = regularPerson =>{
//     console.log(`${regularPerson.firstName} of Canterbury`);
// }

regularPerson = {
    firstName: "Bill",
    lastName: "Sanchez"
}

// lordify(regularPerson);

//To make the above to destructure

const lordify = ({firstName}) =>{
    console.log(`${firstName} of Canterbury`);
}

// lordify(regularPerson);

//***************** */
//We can even destructure a complex object, lets see an example

anotherPerson = {
    firstName:"Gosh",
    lastName:"Hayte",
    land:"Birmingham",
    spouse:{
        firstName: "Baby",
        lastName: "Princess"
    }
}

//So, in this example we have firstName variable 2 times, if we use it at both places we get undefined
//So we use : colon to rename other firstName to any other name and use it
const lordify2 = ({firstName, land, spouse:{firstName: fname}}) =>{
    console.log(`${firstName} of ${land} has spouse ${fname}`);
}

lordify2(anotherPerson);