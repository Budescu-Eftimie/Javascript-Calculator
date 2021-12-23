let add = (a, b) => {
  return a + b;
};
let substract = (a, b) => {
  return a - b;
};
let multiply = (a, b) => {
  return a * b;
};
let divide = (a, b) => {
  return a / b;
};

function operate(operator, a, b) {
  return operator(a, b);
}

//let result = ;
console.log(operate(substract, 10, 15));
