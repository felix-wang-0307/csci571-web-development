

function myNew(constructor: Function, ...args: any[]): any {
  // 1. Create an empty object
  const obj = {};

  // 2. Set the prototype of this object to constructor's prototype
  Object.setPrototypeOf(obj, constructor.prototype); 
  // Equivalent to obj.__proto__ = constructor.prototype

  // 3. Call the constructor with the new object as 'this'
  const result = constructor.apply(obj, args);

  // 4. 
  // (1) If the constructor returns an object, return that object
  // (2) If the constructor returns a primitive value, return the new object
  return (typeof result === 'object' && result !== null) ? result : obj;
}

// Example usage

function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, I am ${this.name}, ${this.age} years old.`);
}

const alice = myNew(Person, 'Alice', 25);
const bob = myNew(Person, 'Bob', 30);
alice.sayHi(); // Hi, I am Alice, 25 years old.
bob.sayHi(); // Hi, I am Bob, 30 years old.