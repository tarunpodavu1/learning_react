const peaks = ["talla", "raston", "everest"];
const canyons = ["great canyon", "ward"];

const tahoe = [...peaks, ...canyons];
// console.log(tahoe);
// console.log(tahoe.join(', '));

/****************** */
//A problem where spread operator can help
//Lets take peaks array
// const [last] = peaks.reverse();
// console.log(last);  //everest
// console.log(peaks.join(", "));  //everest, raston, talla

//The peaks array is reversed and it is only reversed again if we use reverse() again
//Spread operator helps in these situation
const [last] = [...peaks].reverse();
console.log(last); //everest
console.log(peaks.join(", ")); //talla, raston, everest
//The peaks array is never changed, because we used spread operator and made a copy of that array and reverse it.

//We can also use spread operator to get remaining items

const lakes = ["Donner", "Marletee", "Fallen leaf", "Cascade"];
const [first, ...others] = lakes;

console.log(first);
console.log(others);

// Spread operator with objects

const morning = {
  breakfast: "oats",
  lunch: "peanut butter and jelly",
};

const dinner = "mac and cheese";

const backPackingMeals = {
  ...morning,
  dinner,
};

console.log(backPackingMeals);