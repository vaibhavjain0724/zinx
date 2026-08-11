
// function parser(tokens) {

//     let current = 0;

//     function peek() {
//         return tokens[current];
//     }

//     function consume() {
//         return tokens[current++];
//     }

//     function expect(type) {
//         if (peek().type !== type) {
//             throw new Error(
//                 `Expected ${type}, got ${peek().type}`
//             );
//         }

//         return consume();
//     }
//     function parseExpression() {

//         if (peek().type === "INTEGER") {
//             return parseInteger();
//         }

//         if (peek().type === "LEFT_BRACKET") {
//             return parseCompoundExpression();
//         }

//         throw new Error(
//             `Unexpected token: ${peek().type}`
//         );
//     }

//     function parseInteger() {
//         const token = expect("INTEGER");

//         return {
//             type: "IntegerLiteral",
//             value: token.value
//         };
//     }

//     function parseShow() {
//         expect("SHOW");

//         const expression = parseInteger();

//         expect("RIGHT_BRACKET");

//         return {
//             type: "ShowStatement",
//             expression: expression
//         };
//     }

//     function parse() {
//         expect("LEFT_BRACKET");

//         return parseShow();
//     }

//     return parse();
// }

// export { parser };


function parser(tokens) {

    let current = 0;

    function peek() {
        return tokens[current];
    }

    function consume() {
        return tokens[current++];
    }

    function expect(type) {
        if (peek().type !== type) {
            throw new Error(
                `Expected ${type}, got ${peek().type}`
            );
        }

        return consume();
    }

    function parseInteger() {
        const token = expect("INTEGER");

        return {
            type: "IntegerLiteral",
            value: token.value
        };
    }

    function parseExpression() {
        if (peek().type === "INTEGER") {
            return parseInteger();
        }

        if (peek().type === "LEFT_BRACKET") {
            return parseCompoundExpression();
        }

        throw new Error(
            `Unexpected token: ${peek().type}`
        );
    }

    function parseShow() {
        expect("SHOW");

        const expression = parseExpression();

        expect("RIGHT_BRACKET");

        return {
            type: "ShowStatement",
            expression: expression
        };
    }

    function parseBinaryExpression() {
        const operator = consume();

        const left = parseExpression();
        const right = parseExpression();

        expect("RIGHT_BRACKET");

        return {
            type: "BinaryExpression",
            operator: operator.value,
            left: left,
            right: right
        };
    }

    function parseCompoundExpression() {
        expect("LEFT_BRACKET");

        const operator = peek();

        if (operator.type === "SHOW") {
            return parseShow();
        }

        if (
            operator.type === "PLUS" ||
            operator.type === "MINUS" ||
            operator.type === "MULTIPLY" ||
            operator.type === "DIVIDE"
        ) {
            return parseBinaryExpression();
        }

        throw new Error(
            `Unknown operator: ${operator.value}`
        );
    }

    function parse() {
        return parseExpression();
    }

    return parse();
}

export { parser };