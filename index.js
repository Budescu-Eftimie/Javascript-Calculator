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

let ecuation = {
  x: 0,
  y: "",
  operator: "",
};

// We can have 3 displayStates: default,stateOne,stateTwo.
let displayState = "default";

function renderDisplayDigit(digit) {
  if (ecuation.operator != "") {
    displayState = "stateTwo";
  }
  if (displayState == "default") {
    displayState = "stateOne";
    ecuation.x = digit;
    bottomInput.innerText = ecuation.x;
  } else if (displayState == "stateOne") {
    if (digit == "." && ecuation.x.includes(".")) {
      return;
    } else {
      ecuation.x += digit;
      bottomInput.innerText = ecuation.x;
    }
  } else if (displayState == "stateTwo") {
    if (digit == "." && ecuation.y.includes(".")) {
      return;
    } else {
      ecuation.y += digit;
      bottomInput.innerText = ecuation.y;
    }
  }
}

function renderDisplayOperator(operator) {
  if (displayState == "default" || displayState == "stateOne") {
    ecuation.operator = operator;
    topInput.innerText = ecuation.x + operator;
    bottomInput.innerText = ecuation.y;
  } else if (displayState == "stateTwo") {
    // we call the calculate function and replace operators
    let result = getResult(operator);
    ecuation.operator = operator;
    ecuation.x = result;
    ecuation.y = "";
    topInput.innerText = ecuation.x + ecuation.operator;
    bottomInput.innerText = "";
    displayState = "stateThre";
  } else if (displayState == "stateThre") {
    ecuation.operator = operator;
    topInput.innerText = ecuation.x + ecuation.operator;
  }
}

function getOperator(e) {
  let pressedOperator = e.target.innerText;
  renderDisplayOperator(pressedOperator);
}

function getDigit(e) {
  let pressedDigit = e.target.classList[0];
  renderDisplayDigit(pressedDigit);
}

function getResult(e) {
  if (!e.target) {
    result = calculate(
      parseFloat(ecuation.x),
      parseFloat(ecuation.y),
      ecuation.operator[0]
    );
    return result;
  } else {
    if (ecuation.y != "") {
      result = calculate(
        parseFloat(ecuation.x),
        parseFloat(ecuation.y),
        ecuation.operator[0]
      );
      ecuation.x = result;
      ecuation.y = "";
      topInput.innerText = ecuation.x;
      bottomInput.innerText = ecuation.y;
      displayState = "stateOne";
    } else {
      return;
    }
  }
}

buttons.addEventListener("click", function (e) {
  let typeOfBtn = e.target.classList[1];
  if (typeOfBtn == "action") {
    if (e.target.classList[0] == "=") {
      getResult(e);
    } else {
      callAction(e);
    }
  } else if (typeOfBtn == "operator") {
    getOperator(e);
  } else if (typeOfBtn == "digit") {
    getDigit(e);
  } else {
    apendFloat(e);
  }
});
