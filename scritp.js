
/**
 * Adiciona um número ao valor atual no elemento de exibição.
 */
function appendNumber(number) {
    document.getElementById('display').value += number;
}

function appendOperator(operator) {
    document.getElementById('display').value += ' ' + operator + ' ';
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    let display = document.getElementById('display').value;
    
    try {
        // Calcula o resultado da expressão
        let result = parseExpression(display);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Erro';
    }
}

function parseExpression(expression) {
    // Remove espaços em branco
    expression = expression.replace(/\s+/g, '');

    // Substituir "--" por "+" (Exemplo: "10 - -5" se torna "10 + 5")
    expression = expression.replace(/--/g, '+');

    // Verifica se a expressão contém apenas números e operadores válidos
    if (!/^[0-9+\-*/().]+$/.test(expression)) {
        throw new Error('Expressão inválida');
    }

    // Dividir a expressão em operadores e operandos
    let tokens = expression.split(/([+\-*/])/); // Divide a expressão em operadores e operandos
    console.log(tokens);
    // Multiplicação e divisão
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let operand1 = parseFloat(tokens[i - 1]);
            let operand2 = parseFloat(tokens[i + 1]);
            let result;

            if (tokens[i] === '*') {
                result = operand1 * operand2;
            } else if (tokens[i] === '/') {
                result = operand1 / operand2;
            }

            tokens.splice(i - 1, 3, result); // Substitui a operação pelo resultado 
            i--; // Reajusta o índice após modificar o array
        }
    }

    // Adição e subtração
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let nextOperand = parseFloat(tokens[i + 1]);

        if (operator === '+') {
            result += nextOperand;
        } else if (operator === '-') {
            result -= nextOperand;
        }
    }

    return result;
}
