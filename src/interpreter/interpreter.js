

let variables = {};

let outputArr = [];

let statement = sessionStorage.getItem("statement");

if (statement == null) {
    statement = 0;
}

function restart() {
    clearOutput();

    statement = 0;
    variables = {};

    sessionStorage.removeItem("statement");
}

function interpret(node) {

    if (node.type === "Program") {

        if (statement >= node.statements.length) {
            return;
        }

        interpret(node.statements[statement]);

        statement++;

        sessionStorage.setItem("statement", statement);

        return;
    }

    if (node.type === "IntegerLiteral") {
        return node.value;
    }

    if (node.type === "BooleanLiteral") {
        return node.value;
    }

    if (node.type === "Identifier") {

        if (!(node.name in variables)) {
            throw new Error(
                `Undefined variable: ${node.name}`
            );
        }

        return variables[node.name];
    }

    if (node.type === "VariableDeclaration") {

        const value = interpret(node.value);

        variables[node.name] = value;

        return;
    }

    if (node.type === "ShowStatement") {

        const value = interpret(node.expression);

        outputArr.push(value);

        return;
    }

    if (node.type === "BinaryExpression") {

        const left = interpret(node.left);
        const right = interpret(node.right);

        if (node.operator === "+") {
            return left + right;
        }

        if (node.operator === "-") {
            return left - right;
        }

        if (node.operator === "*") {
            return left * right;
        }

        if (node.operator === "/") {

            if (right === 0) {
                throw new Error("Division by zero");
            }

            return left / right;
        }

        throw new Error(
            `Unknown operator: ${node.operator}`
        );
    }

    throw new Error(
        `Unknown AST node: ${node.type}`
    );
}

function clearOutput() {
    outputArr.length = 0;
}

export {
    interpret,
    outputArr,
    restart
};
