
// 1. Factory function to create instances
function createUser(name: string) {
  let _name = name;
  return {
    getName: function () {
      return _name;
    },
    setName: function (name: string) {
      _name = name;
    },
    say: function () {
      console.log(`My name is ${_name}`);
    },
    sayArrow: () => {
      console.log(`My name is ${_name}`);
    },
  }
}

const user1 = createUser('Alice');
const user2 = createUser('Bob');
user1.say(); // My name is Alice
user2.sayArrow(); // My name is Bob
// The two instances are independent

// 2. Constructor function to create instances
function User(this: any, name: string) {
  this.name = name; 
  console.log(`${this.name}'s this is ${this}`);
  this.say = function () {
    console.log(`My name is ${this.name}`);
  };
  this.sayArrow = () => {
    console.log(`My name is ${this.name}`);
  };
}

const user3 = new User('Cindy');
const user4 = new User('Divid');
user3.say(); // My name is Alice
user4.sayArrow(); // My name is Divid

setTimeout(user3.say, 1000); // My name is undefined
setTimeout(user3.say.bind(user3), 1000); // My name is Cindy
setTimeout(user4.sayArrow, 1000); // My name is Divid

// 3. Directly create instances
const user5 = {
  name: 'Eve',
  say: function () {
    console.log(`My name is ${this.name}`);
  },
};

const user6 = user5;
user6.name = 'Frank';
const user7 = Object.create(user5);
user7.name = 'Grace';
user5.say(); // My name is Frank
// Because user5 and user6 point to the same object, 
// changing user6.name will also change user5.name
user6.say(); // My name is Frank

user7.say(); // My name is Grace
// user7 is a new object, but it inherits from user5
// So user7.name is 'Grace', but user5.name is 'Frank'

setTimeout(user5.say, 1000); // My name is Frank