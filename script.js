// Using the bind method
console.log("Using the bind method");
let multiply = function (x, y) {
  console.log(x * y);
};

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5);

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);


// Using the concept of CLosures
console.log("Using the concept of CLosures");
multiply = function (x) {
  return function (y) {
    console.log(x * y);
  };
};

multiplyByTwo = multiply(2);
multiplyByTwo(5);

multiplyByThree = multiply(3);
multiplyByThree(5);
