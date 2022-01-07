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
    "×": (a, b) => a * b,
    "/": (a, b) => (b == 0 ? "lmao" : a / b),
  };

  return operation in operators ? operators[operation](x, y) : NaN;
}

let calculator = {
  x: 0,
  y: "",
  operator: "",
};

// We can have 4 displayStates: default,stateOne,stateTwo, stateThre.
let displayState = "default";

function renderDisplayDigit(digit) {
  if (calculator.operator != "") {
    displayState = "stateTwo";
  }
  if (displayState == "default") {
    displayState = "stateOne";
    calculator.x = digit;
    bottomInput.innerText = calculator.x;
  } else if (displayState == "state4") {
    calculator.x = digit;
    calculator.y = "";
    topInput.innerText = calculator.y;
    bottomInput.innerText = calculator.x;
    displayState = "stateOne";
  } else if (displayState == "stateOne") {
    if (digit == "." && calculator.x.includes(".")) {
      return;
    } else {
      calculator.x += digit;
      bottomInput.innerText = calculator.x;
    }
  } else if (displayState == "stateTwo") {
    if (digit == "." && calculator.y.includes(".")) {
      return;
    } else {
      calculator.y += digit;
      bottomInput.innerText = calculator.y;
    }
  }
}

function renderDisplayOperator(operator) {
  if (displayState == "default" || displayState == "stateOne") {
    calculator.operator = operator;
    topInput.innerText = calculator.x + operator;
    bottomInput.innerText = calculator.y;
  } else if (displayState == "stateTwo") {
    // we call the calculate function and replace operators
    let result = getResult(operator);
    calculator.operator = operator;
    calculator.x = result;
    calculator.y = "";
    topInput.innerText = calculator.x + calculator.operator;
    bottomInput.innerText = "";
    displayState = "stateThre";
  } else if (displayState == "stateThre") {
    calculator.operator = operator;
    topInput.innerText = calculator.x + calculator.operator;
  } else {
    calculator.operator = operator;
    topInput.innerText = calculator.x + calculator.operator;
  }
}

function getOperator(e) {
  let pressedOperator = e.target.innerText;
  renderDisplayOperator(pressedOperator);
}

function getDigit(e) {
  let pressedDigit = e.target.innerText;
  renderDisplayDigit(pressedDigit);
}

function getResult(e) {
  if (!e.target) {
    result = calculate(
      parseFloat(calculator.x),
      parseFloat(calculator.y),
      calculator.operator[0]
    );
    return result.toFixed(10);
  } else {
    if (calculator.y != "") {
      result = calculate(
        parseFloat(calculator.x),
        parseFloat(calculator.y),
        calculator.operator[0]
      );
      calculator.x = result.toFixed(10);
      calculator.y = "";
      topInput.innerText = calculator.x;
      bottomInput.innerText = calculator.y;
      calculator.operator = "";
      displayState = "state4";
    } else {
      return;
    }
  }
}

function callAction(e) {
  let actType = e.target.innerText;
  if (actType == "Reset") {
    displayState = "default";
    calculator.x = 0;
    calculator.y = "";
    calculator.operator = "";
    topInput.innerText = calculator.y;
    bottomInput.innerText = calculator.x;
  } else if (lastBtns[1] == "=") {
    calculator.x = "0";
    calculator.y = "";
    bottomInput.innerText = calculator.x;
    topInput.innerText = calculator.y;
    displayState = "default";
  } else if (
    actType == "DEL" &&
    displayState == "stateOne" &&
    String(calculator.x).slice(-1) != "+"
  ) {
    if (calculator.x.length > 1) {
      calculator.x = calculator.x.slice(0, -1);
    } else {
      calculator.x = 0;
      displayState = "default";
    }

    bottomInput.innerText = calculator.x;
  } else if (actType == "DEL" && displayState == "stateTwo") {
    calculator.y = calculator.y.slice(0, -1);
    bottomInput.innerText = calculator.y;
  } else {
    return;
  }
}

let lastBtns = ["first", "second"];

buttons.addEventListener("click", function (e) {
  lastBtns.unshift(e.target.innerText);
  lastBtns.pop();
  let typeOfBtn = e.target.classList;
  if (typeOfBtn == "action") {
    if (e.target.innerText == "=") {
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
