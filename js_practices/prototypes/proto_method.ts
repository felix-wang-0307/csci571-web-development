// @ts-nocheck

Object.defineProperty(Object.prototype, 'sayHi', {
  value: function () {
    console.log(`Hi from Object, I am ${this.name}`);
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

function Animal(name: string) {
  this.name = name;
}

Animal.prototype.sayHi = function () {
  console.log(`Hi from Animal, I am ${this.name}`);
}

let cat1 = new Animal('Tom');

cat1.sayHi(); // Hi from Animal, I am Tom
// cat1 (no sayHi) -> cat.__proto__===Animal.prototype (has sayHi)

cat1.sayHi = function () {
  console.log(`Meow, I am ${this.name}`);
}

cat1.sayHi(); // Meow, I am Tom
// cat1 (has sayHi, call it) 

function Dog(name: string) {
  this.name = name;
}

let dog1 = new Dog('Mike');
dog1.sayHi();  // Hi from Object, I am Mike
// dog1 (no sayHi) -> dog.__proto__===Dog.prototype (no sayHi) 
// -> Dog.prototype.__proto__===Animal.prototype (has sayHi)

Object.setPrototypeOf(dog1, Animal.prototype);
// Equivalent to dog1.__proto__ = Animal.prototype
dog1.sayHi(); // Hi from Animal, I am Mike
// dog1 (no sayHi) -> dog.__proto__===Animal.prototype (has sayHi)

