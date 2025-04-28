function Parent(name: string) {
  this.name = name;
  this.say = function () {
    console.log(`My name is ${this.name}`);
  };
  this.sayArrow = () => {
    console.log(`My name is ${this.name}`);
  };
}

function Child(name: string) {
  // Step 1: Call the Parent constructor
  Parent.call(this, name);
  this.say = function () {
    console.log(`Child: my name is ${this.name}`);
  };
  this.cry = function () {
    console.log(`Child: I am crying`);
  }
}

// Step 2: Set the prototype of Child to an instance of Parent
Child.prototype = Object.create(Parent.prototype);
// Equivalent to Child.prototype = new Parent();

// Step 3: Set the constructor of Child to Child
Child.prototype.constructor = Child;

const child = new Child('Tom');
child.say(); // Child: my name is Tom
child.sayArrow(); // My name is Tom
child.cry(); // Child: I am crying