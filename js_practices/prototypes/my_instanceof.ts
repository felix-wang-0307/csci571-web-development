
function myInstanceof(instance: any, constructor: Function): boolean {
  let proto = constructor.prototype;
  while (instance.__proto__ !== null) {
    if (instance.__proto__ === proto) {
      return true;
    }
    instance = instance.__proto__;
  }
  return false;
}

console.log(myInstanceof([], Array)); // true
console.log(myInstanceof({}, Object)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof({}, Array)); // false
console.log(myInstanceof(new Date(), Date)); // true