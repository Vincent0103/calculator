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
  else if (Array.isArray(arr)) return arr.filter((item) => item.match(/[+\-*/]/g));
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
    if (
    Number.isInteger(parseInt(endDigit))
    ) {
    htmlElement.textContent = "";
    } else if (getOperators(endDigit)) {
        htmlElement.textContent = htmlElement.textContent.slice(0, -3);
    }
}

function calcDisplay(btn) {
  let result = 0;
  const screenNums = document.querySelector(".screen-nums");

  if (Number.isInteger(parseInt(btn.textContent))) {
    screenNums.textContent += btn.textContent;

  } else if (btn.textContent === ".") {
    const operation = screenNums.textContent.split(" ");
    const lastDigit = "";

    console.log(lastDigit);
    if (!getOperators(lastDigit) || lastDigit !== ".") {
        screenNums.textContent += ".";
    };

    // check if the clicked btn is an operator
  } else if (
    getOperators(btn.textContent) !== null &&
    btn.textContent === getOperators(btn.textContent)[0]
  ) {
    screenNums.textContent += ` ${btn.textContent} `;
    operation = screenNums.textContent.split(" ");

    /* when we split the operation, the last element is an empty string due
         to the extra spaces around the operator in screenNums */
    if (operation.length === 5) {
      result = checkCorrectOperation(result, operation);

      if (result === "") screenNums.textContent = result;
      else screenNums.textContent = `${result} ${operation[3]} `;
    }
  } else if (btn.textContent === "enter") {
    let operation = screenNums.textContent.split(" ");

    // update result value based on what's in the calculator screen
    if (operation.length === 1 || operation[2] === "") {
      result = screenNums.textContent;
    } else {
      result = checkCorrectOperation(result, operation);
    }
    screenNums.textContent = result;
  } else if (btn.textContent === "AC") screenNums.textContent = "";
  else if (btn.textContent === "->") {
    let currentOperation = screenNums.textContent.split(" ")

    // check what character is being deleted then remove it from calculator screen
    let lastOperationDigit = removeLastDigit(currentOperation);

    rewindToLastMove(lastOperationDigit, screenNums);
  }
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
