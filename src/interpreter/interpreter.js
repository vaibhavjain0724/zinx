// const ast = {
//     type: "BinaryExpression",
//     operator: "+",

//     left: {
//         type: "IntegerLiteral",
//         value: 5
//     },

//     right: {
//         type: "IntegerLiteral",
//         value: 10
//     }
// };

// let outputArr = [];


// function interpret(node) {  
//     if (node.type === "IntegerLiteral") {
//         return node.value;
//     }
//     if (node.type === "ShowStatement") {
//         const value = interpret(node.expression);
//         outputArr.push(value);
//     }

//     if (node.type === "BinaryExpression") {

//         const left = interpret(node.left);
//         const right = interpret(node.right);

//         if (node.operator === "+") {
//             return left + right;
//         }
//     }
// }

// console.log(interpret(ast))





// export {interpret , outputArr}




let outputArr = [];

function interpret(node) {

    if (node.type === "IntegerLiteral") {
        return node.value;
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
    }
}

export { interpret, outputArr };