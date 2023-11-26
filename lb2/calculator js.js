window.onload = function () {

    let a = ''
    let b = ''
    let b2 = 0;
    let g = 0
    let expressionResult = ''
    let selectedOperation = null
    let selectedOperation2 = null
    let color = false

    // окно вывода результата
    outputElement = document.getElementById("result")
    vesCalculator = document.getElementById("fon")
    ktovipolnil = document.getElementById("towhite")
    cel = document.getElementById("towhite1")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function factorial(n) {
        let ans = 1;

        if (n === 0)
            return 1;
        for (let i = 2; i <= n; i++)
            ans = ans * i;
        return ans;
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
            }
            outputElement.innerHTML = b
        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
        selectedOperation2 = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
        selectedOperation2 = '+'
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
        selectedOperation2 = '-'
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
        selectedOperation2 = '/'
    }

    //операция смены знака
    document.getElementById("btn_op_sign").onclick = function () {
        if (selectedOperation === '+') {
            selectedOperation = '-'
            return selectedOperation
        }
        else if (selectedOperation === '-') {
            selectedOperation = '+'
            return selectedOperation
        }
    }

    //высчитывание процента
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '') return
        selectedOperation = '%'
    }

    //операция возведения в степень 2
    document.getElementById("btn_op_kvadrat").onclick = function () {
        if (a === '') return
        selectedOperation = '**2'
    }

    //операция вычислить квадратный корень
    document.getElementById("btn_op_koren").onclick = function () {
        if (a === '') return
        selectedOperation = '**(1/2)'
    }

    //операция вычислить факториал
    document.getElementById("btn_op_factorial").onclick = function () {
        if (a === '') return
        selectedOperation = '!'
    }

    //операция добавить 000
    document.getElementById("btn_op_000").onclick = function () {
        if (!selectedOperation) {
            a += '000'
            outputElement.innerHTML = a
        } else {
            b += '000'
            outputElement.innerHTML = b
        }
    }

    //смена цвета окна вывода
    document.getElementById("btn_op_smenit_temu").onclick = function () {
        color = !color;
        if (color === true) {
            outputElement.style.backgroundColor = "#000000"
        }
        else {
            outputElement.style.backgroundColor = "#7fffd4"
        }

    }

    // смена цвета всего калькулятора
    document.getElementById("btn_op_smenit_temu2").onclick = function () {

        color = !color;
        if (color === true) {
            vesCalculator.style.backgroundColor = "#000000"
            ktovipolnil.style.color = "#fff"
            cel.style.color = "#fff"
        }
        else {
            vesCalculator.style.backgroundColor = "#fff"
            ktovipolnil.style.color = "#000000"
            cel.style.color = "#000000"
        }

    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    //кнопка backspace (удалить символ)
    document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation) {
            a = a.slice(0, a.length - 1)
            outputElement.innerHTML = a
        } else {
            b = b.slice(0, b.length - 1)
            outputElement.innerHTML = b
        }

    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a && b === '' && selectedOperation) {
            switch (selectedOperation) {
                case '**2':
                    expressionResult = (+a) ** 2
                    break;
                case '**(1/2)':
                    expressionResult = (+a) ** (1 / 2)
                    break;
                case '!':
                    expressionResult = factorial(+a)
                    break;

            }
        }
        if (selectedOperation === '=') {
            switch (selectedOperation2) {
                case '+':
                    expressionResult = (+a) + (+b2)
                    break;
                case '-':
                    expressionResult = (+a) - (+b2)
                    break;
                case 'x':
                    expressionResult = (+a) * (+b2)
                    break;
                case '/':
                    expressionResult = (+a) / (+b2)
                    break;
            }
        }
        else if (a === '' || b === '' || !selectedOperation) {
            return
        }

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                b2 = b
                break;
            case '+':
                expressionResult = (+a) + (+b)
                b2 = b
                break;
            case '-':
                expressionResult = (+a) - (+b)
                b2 = b
                break;
            case '/':
                expressionResult = (+a) / (+b)
                b2 = b
                break;
            case '%':
                expressionResult = (+a) % (+b)
                break;
        }



        a = expressionResult.toString()
        b = ''
        selectedOperation = '='



        outputElement.innerHTML = a
    }
}
