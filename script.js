function add(a, b) {
    return (a + b !== NaN) ? a + b : "err";
}

function subtract(a, b) {
    return (a - b !== NaN) ? a - b : "err";
}

function multiply(a, b) {
    return (a * b !== NaN) ? a * b : "err";
}

function divide(a, b) {
    return (a / b !== NaN) ? a / b : "err";
}

function operate(a, op, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        a = parseInt(a);
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

function getOperator(obj) {
    // check if the obj parameter is a string or an array
    if (typeof obj === "string") return obj.match(/[+\-*/]/g);
    return obj.filter(item => item.match(/[+\-*/]/g));
}

function calcDisplay(btn) {
    console.log("doing");
    const screenNums = document.querySelector(".screen-nums");

    if (Number.isInteger(parseInt(btn.textContent))) {
        screenNums.textContent += btn.textContent;

    // check if the clicked btn is an operator
    } else if (getOperator(btn.textContent) !== null && btn.textContent === getOperator(btn.textContent)[0]) {
        screenNums.textContent += ` ${btn.textContent} `;

    }
    else if (btn.textContent === "enter") {
        const operations = screenNums.textContent.split(" ");
        let result = 0;
        operations.forEach((operation, i) => {
            if (operation === "+" || operation === "-" || operation === "*" || operation === "/") {
                result += operate(operations[i - 1], operations[i], operations[i + 1]);
            }
        })
        screenNums.textContent = result;

    } else if (btn.textContent === "clear") screenNums.textContent = "";

}

window.addEventListener("DOMContentLoaded", () => {
    const calcDigits = document.querySelectorAll(".calc-digits");
    const taskBtns = document.querySelectorAll(".task-btns");

    calcDigits.forEach(digit => {
        digit.addEventListener("click", () => {
            calcDisplay(digit);
        })
    })

    taskBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            calcDisplay(btn);
        })
    })
})