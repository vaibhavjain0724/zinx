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



function restart(){
    clearOutput();
    statement = 0;
    sessionStorage.removeItem("statement");
}
let outputArr = [];
let statement = sessionStorage.getItem("statement");
if(statement == null) statement= 0 ;
 function interpret(node) {
    if (node.type === "Program") {
        if(statement >= node.statements.length) return;

        interpret(node.statements[statement]);
        statement++;
        sessionStorage.setItem("statement", statement);
        // for (const statement of node.statements) {
        //     interpret(statement);
            

        // }
    
        // for(let i = statement +1; i < node.statements.length ; i++){
        //     interpret(i);
        //     statement++;
        // }
        return;
    }
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
function clearOutput() {
    outputArr.length = 0;
}

export { interpret, outputArr , restart};