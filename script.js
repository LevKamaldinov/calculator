
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', '+', '*', '/', '=', 'reset'];
      dataNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      dataSymbols = ['-', '+', '*', '/'];
      equal = '=';
      reset = 'reset';
      wrapper = document.querySelector('.wrapper');
      input = document.querySelector('input');

data.forEach(el => {
    const element = document.createElement('button');
    element.setAttribute('type', 'button');
    element.textContent = el;
    element.classList.add('button');
    wrapper.append(element);
});

const elementsOfCalculator = document.querySelectorAll('button');

let result = '';

elementsOfCalculator.forEach(el => {
    el.addEventListener('click', () => {

        if (dataNumbers.includes(Number(el.textContent))) {
            result += el.textContent;
            input.value = result;
        } else if (dataSymbols.includes(el.textContent)) {
            let lastSymbol = result[result.length - 1];
            if (lastSymbol == '-'
            || lastSymbol == '+'
            || lastSymbol == '*'
            || lastSymbol == '/') {
                result = result.replace(result[result.length - 1], el.textContent);
                input.value = result;
            } else {
                result += el.textContent;
                input.value = result;
            }
        } else if (el.textContent == 'reset') {
            result = '';
            input.value = '';
        } else {
            // console.log(typeof(input.value));
            showResult(input.value);
        }

    })
})

function stringWithOutLastSymbol(string) { // эта функция убирает лишние математические знаки в конце выражения, если они есть
    let result = string;
    let lastSymbol = result[result.length - 1];

    if (lastSymbol == '-' ||
        lastSymbol == '+' ||
        lastSymbol == '*' ||
        lastSymbol == '/') {
            result = string.slice(0, string.length - 1);
        } else {
            return result;
        }
    return stringWithOutLastSymbol(result);
};

function simplificationOfExpression(string) { // эта функция будет находить выражения с умножением и делением и производить их, заменяя затем нужные куски строки на значения выражений
    // console.log(string);
    let expression;
    let pattern;
    if (string[0] == '-') {
        pattern = /\-\d+[\*\/]\d+/
    } else {
        pattern = /\d+[\*\/]\d+/;
    }
    string = stringWithOutLastSymbol(string);
    if (string.match(pattern)) {
        expression = string.match(pattern)[0];
        for (i = 0; i < expression.length; i++) {
            if (dataNumbers.includes(Number(expression[i])) || expression[i] == '-') {
                continue;
            } else {
                let firstNumber = Number(expression.slice(0, i));
                    secondNumber = Number(expression.slice(i + 1));
                    symbol = expression[i];
                    result = 0;
                switch (symbol) {
                    case '*':
                        result = firstNumber * secondNumber;
                        break;
                    case '/':
                        if (secondNumber == 0) {
                            return false;
                        } else {
                            result = firstNumber / secondNumber;
                        }
                        break;
                    default:
                        console.log('Mistake in the expression');
                }
                string = string.replace(pattern, result);
                return simplificationOfExpression(string);
            }
        }
    } else {
        return string;
    }
};

function calculate(string) {    
    // console.log(string);

    let expression; 
    string = simplificationOfExpression(string);
    let pattern;
    if (string[0] == '-') {
        pattern = /\-\d+[\+\-]\d+/
    } else {
        pattern = /\d+[\+\-]\d+/;
    }
    if (string) {
        console.log(string);

        if (string.match(pattern)) {
            expression = string.match(pattern)[0];
            console.log(expression);
            // на этом этапе возникает ошибка, если в начале идёт отрицательное число, тогда в паттерн попадает выражение без отрицательного оператора перед первым числом
            for (i = 0; i < expression.length; i++) {
                if (dataNumbers.includes(Number(expression[i]))) {
                    continue;
                } else if (expression[i] == '-' && i === 0) {
                    console.log(expression);
                    continue;
                } else {
                    let firstNumber = Number(expression.slice(0, i));
                        secondNumber = Number(expression.slice(i + 1));
                        symbol = expression[i];
                        result = 0;

                    console.log(firstNumber);
                    switch (symbol) {
                        case '+':
                            result = firstNumber + secondNumber;
                            break;
                        case '-':
                            result = firstNumber - secondNumber;
                            break;
                        default:
                            console.log('Mistake in the expression');
                    }
                    string = string.replace(pattern, result);
                    return calculate(string);
                }
            }
        } else {
            return string;
        }
    } else {
        console.log(string);
        return false;
    }
}

function showResult(string) { // эта функция будет выводить итог всех вычислений (или ошибку) в инпуте, как результат действий пользователя
    string = calculate(string);
    if (string) {
        return input.value = string;
    } else {
        console.log(string);
        alert('Неправильная операция, измените выражение');
    }
}


// для дальнейшего развития калькулятора:
// (?<=^\().+(?=\)) // это регулярное выражения для поиска выражений в скобках, но оно не совсем верное, ищет только внутри скобок, а если скобки двойные, это не совсем то в глобальном плане

