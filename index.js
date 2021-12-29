// variables
//const resetBtn = document.body.querySelector('button[data-key="C"]');
let bottomInput = document.getElementsByClassName("bottom-input")[0];
let topInput = document.getElementsByClassName("top-input")[0];
const buttons = document.body.querySelector(".buttons");
//operations
function calculate(x, y, operation) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  return operation in operators ? operators[operation](x, y) : NaN;
}

//let result = ;
console.log(calculate(10, 15, "+"));
// function doSomething(e) {
//   let btnClicked = e.target.classList[1];
//   console.log(btnClicked, "is");
//   if (btnClicked.className === "C") {
//     bottomInput.innerText = 0;
//     topInput.innerText = "";
//     numberA = "";
//   } else if (
//     btnClicked.className == "multiply" ||
//     btnClicked.className == "divide" ||
//     btnClicked.className == "add" ||
//     btnClicked.className == "substract"
//   ) {
//     operatorx = btnClicked.innerText;
//     console.log(btnClicked.className);
//     numberB = numberA;
//     topInput.innerText = numberA + btnClicked.innerText;
//     bottomInput.innerText = "";
//     numberA = "";
//   } else if (btnClicked.className === "CE") {
//     console.log("CE");
//   } else if (btnClicked.className === "x") {
//     console.log("Delete");
//   } else if (btnClicked.className === "Hs") {
//     console.log("Hs");
//   } else if (btnClicked.className === ".") {
//     console.log(".");
//   } else {
//     numberA += btnClicked.className;
//     bottomInput.innerText = numberA;
//     console.log(numberA);
//   }
// }

buttons.addEventListener("click", function (e) {
  getBtnType(e);
});

// function checkIfFirstOperator(numberA) {
//   console.l;
// }
let numberA = bottomInput.innerText;
let numberB = "";
let ecuation = "";
let operatorx = "";

// get button type (digit,operator, functionality ex:(equals,delete,history)
function getBtnType(e) {
  let typeOfBtn = e.target.classList[1];
  let btnClicked = e.target.classList[0];
  if (numberB == "" && typeOfBtn == "digit") {
    ecuation += btnClicked;
    numberA = ecuation;
    bottomInput.innerText = numberA;
  } else if (numberB == "" && typeOfBtn == "operator") {
    ecuation += e.target.innerText;
    numberB = ecuation;
    topInput.innerText = numberB;
    numberA = "";
    bottomInput.innerText = "";
  } else if (numberB != "" && typeOfBtn == "digit") {
    numberA += btnClicked;
    bottomInput.innerText = numberA;
  } else if (numberB != "" && numberA != "" && typeOfBtn == "operator") {
    let x = numberB.substring(0, numberB.length - 1);
    console.log(x);
    let y = numberA;
    console.log(y);
    let op = numberB.slice(numberB.length - 1);

    result = calculate(parseInt(x), parseInt(y), op);
    console.log(result);
    numberB = result + e.target.innerText;
    topInput.innerText = numberB;
    numberA = "";
    bottomInput.innerText = "";
  } else if (numberB != "" && numberA != "" && typeOfBtn == "equals") {
    let x = numberB.substring(0, numberB.length - 1);
    console.log(x);
    let y = numberA;
    console.log(y);
    let op = numberB.slice(numberB.length - 1);
    result = calculate(parseInt(x), parseInt(y), op);
    numberB = result;
    topInput.innerText = numberB;
    bottomInput.innerText = "";
    numberA = "";
  }
}
