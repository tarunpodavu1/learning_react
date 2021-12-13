// Object literal Enhancement or restructuring is opposite of destructuting
//With Object literal Enhancement we can grab variables from the global scope and add them to an object

const name_ = "tallac";
const elevate = 9738;
const print = function () {
  console.log(`Mt. ${this.name_} is ${this.elevate} feet tall`);
};

const funHike = { name_, elevate, print };
console.log(funHike);
funHike.print();

//When defining object methods, it's no longer necessary to use the 'function' keyword

//Old
// var skier = {
//   name_: name_,
//   sound: sound,
//   powderYell: function () {
//     var yell = this.sound.toUpperCase();
//     console.log(`${yell} ${yell} ${yell}!!!!`);
//   },
//   speed: function (mph) {
//     this.speed = mph;
//     console.log("speed :", mph);
//   },
// };

//New
var skier = {
    name_,
    sound,
    powderYell() {
      var yell = this.sound.toUpperCase();
      console.log(`${yell} ${yell} ${yell}!!!!`);
    },
    speed(mph) {
      this.speed = mph;
      console.log("speed :", mph);
    },
  };
  
