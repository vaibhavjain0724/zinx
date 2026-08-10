const ast = {
    type: "BinaryExpression",
    operator: "+",

    left: {
        type: "IntegerLiteral",
        value: 5
    },

    right: {
        type: "IntegerLiteral",
        value: 10
    }
};

let output = [];


function interpret(node) {  
    if (node.type === "IntegerLiteral") {
        return node.value;
    }
    if (node.type === "ShowStatement") {
        const value = interpret(node.expression);
        output.add(value);
    }

    if (node.type === "BinaryExpression") {

        const left = interpret(node.left);
        const right = interpret(node.right);

        if (node.operator === "+") {
            return left + right;
        }
    }
}

console.log(interpret(ast))





export {interpret , output}