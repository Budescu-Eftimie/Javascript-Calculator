// variables
//const resetBtn = document.body.querySelector('button[data-key="C"]');
let display = document.getElementsByClassName("screen")[0];
const buttons = document.body.querySelectorAll("button");

function doSomething() {
  let btnClicked = this.getAttribute("data-key");
  if (btnClicked === "C") {
    display.textContent = 0;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", doSomething);
});

//operations
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
