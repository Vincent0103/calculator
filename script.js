function add(a, b) {
  return a + b !== NaN ? Math.round((a + b) * 10 ** 5) / 10 ** 5 : "err";
}

function subtract(a, b) {
  return a - b !== NaN ? Math.round((a - b) * 10 ** 5) / 10 ** 5 : "err";
}

function multiply(a, b) {
  return a * b !== NaN ? Math.round(a * b * 10 ** 5) / 10 ** 5 : "err";
}

function divide(a, b) {
  if (a / b === NaN) {
    return "err";
  } else if (a / b === Infinity) {
    return "impossible";
  } else {
    return Math.round((a / b) * 10 ** 5) / 10 ** 5;
  }
}

function operate(a, op, b) {
  if (a % 1 != 0) {
    a = parseFloat(a);
  } else if (!Number.isInteger(a)) {
    a = parseInt(a);
  }

  if (b % 1 != 0) {
    b = parseFloat(b);
  } else if (!Number.isInteger(b)) {
    b = parseInt(b);
  }

  switch (op) {
    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "*":
      return multiply(a, b);

    case "/":
      return divide(a, b);

    default:
      return "err";
  }
}

function getOperators(arr) {
  // check if the obj parameter is a string or an array
  if (typeof arr === "string") return arr.match(/[+\-*/]/g);
  else if (Array.isArray(arr))
    return arr.filter((item) => item.match(/[+\-*/]/g));
  else return false;
}

function checkCorrectOperation(result, operation) {
  if (typeof operate(operation[0], operation[1], operation[2]) === "string") {
    result = operate(operation[0], operation[1], operation[2]);
  } else if (operation[2] === "") {
    result = "";
  } else {
    result += operate(operation[0], operation[1], operation[2]);
  }
  return result;
}

function removeLastDigit(operation) {
  let lastOperationDigit;
  if (operation[operation.length - 1] === "") {
    lastOperationDigit = operation[operation.length - 2];
  } else {
    lastOperationDigit = operation[operation.length - 1];
  }
  return lastOperationDigit;
}

// function getLastDigit(operation)

function rewindToLastMove(endDigit, htmlElement) {
  if (Number.isInteger(parseInt(endDigit))) {
    htmlElement.textContent = "";
  } else if (getOperators(endDigit)) {
    htmlElement.textContent = htmlElement.textContent.slice(0, -3);
  }
}

function checkTextContentLength(htmlElement) {
  if (
    htmlElement.textContent.length > 9 &&
    htmlElement.textContent.length <= 15
  ) {
    htmlElement.style.fontSize = "2.3em";
  } else if (
    htmlElement.textContent.length > 15 &&
    htmlElement.textContent.length <= 23
  ) {
    htmlElement.style.fontSize = "1.5em";
  } else if (htmlElement.textContent.length > 23) {
    htmlElement.textContent = htmlElement.textContent.slice(0, 23);
  } else {
    htmlElement.style.fontSize = "3em";
  }
}

function calcDisplay(btn) {
  let result = 0;
  const screenNums = document.querySelector(".screen-nums");

  if (Number.isInteger(parseInt(btn.textContent))) {
    screenNums.textContent += btn.textContent;
  } else if (btn.textContent === ".") {
    screenNums.textContent += ".";
    const operation = screenNums.textContent.split(" ");

    operation.forEach(digit => {
      if (digit.match(/[.]/g) !== null && digit.match(/[.]/g).length >= 2) {
        screenNums.textContent = screenNums.textContent.slice(0, screenNums.textContent.length - 1);
      }
    })


    // check if the clicked btn is an operator
  } else if (
    getOperators(btn.textContent) !== null &&
    btn.textContent === getOperators(btn.textContent)[0]
  ) {
    screenNums.textContent += ` ${btn.textContent} `;
    const operation = screenNums.textContent.split(" ");

    /* when we split the operation, the last element is an empty string due
         to the extra spaces around the operator in screenNums */
    if (operation.length === 5) {
      result = checkCorrectOperation(result, operation);

      if (result === "") screenNums.textContent = result;
      else screenNums.textContent = `${result} ${operation[3]} `;
    }
  } else if (btn.textContent === "enter") {
    const operation = screenNums.textContent.split(" ");

    // update result value based on what's in the calculator screen
    if (operation.length === 1 || operation[2] === "") {
      result = screenNums.textContent;
    } else {
      result = checkCorrectOperation(result, operation);
    }
    screenNums.textContent = result;
  } else if (btn.textContent === "AC") screenNums.textContent = "";
  else if (btn.textContent === "->") {
    const operation = screenNums.textContent.split(" ");

    // check what character is being deleted then remove it from calculator screen
    let lastOperationDigit = removeLastDigit(operation);
    rewindToLastMove(lastOperationDigit, screenNums);
  }

  /* resize font size inside the calc's screen if the numbers are too long
  or make user unable to type further more */
  checkTextContentLength(screenNums);
}

window.addEventListener("DOMContentLoaded", () => {
  const calcDigits = document.querySelectorAll(".calc-digits");
  const enterBtn = document.querySelector(".enter-btn");
  const clrBtns = document.querySelectorAll(".clr-btns");

  calcDigits.forEach((digit) => {
    digit.addEventListener("click", () => {
      calcDisplay(digit);
    });
  });

  enterBtn.addEventListener("click", () => {
    calcDisplay(enterBtn);
  });

  clrBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      calcDisplay(btn);
    });
  });
});
