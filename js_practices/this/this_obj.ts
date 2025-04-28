
function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(`My name is ${this.name}, I am ${this.age} years old.`);
  };
  this.sayArrow = () => {
    console.log(`My name is ${this.name}, I am ${this.age} years old.`);
  };
  this.changeName = function (name: string) {
    this.name = name;
  };
}

const person1 = new Person('Alice', 25);

const say = person1.say;
const sayArrow = person1.sayArrow;
const boundSay = person1.say.bind(person1);
say(); // Lost context, undefined
sayArrow(); // OK
boundSay(); // OK

say.call(person1);  // OK

person1.changeName('Cindy');
person1.say(); // My name is Cindy, I am 25 years old.

var age = 100;

function changeName(person: any, name: string) {
  console.log(this.age);
  person.changeName(name);
}

changeName(person1, 'Bob');  
changeName.call(person1, person1, 'Bob');