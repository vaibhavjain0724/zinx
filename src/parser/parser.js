// let types = new Map();

// types.set("INTEGER","IntegerLiteral");
// types.set("SHOW", "ShowStatement");



// //dummy


// // function parser(tokens) {

// //     let current = 0;

// //     // Look at the current token without consuming it
// //     function peek() {
// //         return tokens[current];
// //     }

// //     // Consume the current token
// //     function consume() {
// //         return tokens[current++];
// //     }

// //     function parseStatement(){

// //     }

// //     // Make sure the current token is what we expect
// //     function expect(type) {
// //         if (peek().type !== type) {
// //             throw new Error(
// //                 `Expected ${type}, got ${peek().type}`
// //             );
// //         }

// //         return consume();
// //     }

// //     function parse() {

// //         // [ 
// //         expect("LEFT_BRACKET");

// //         // show
// //         expect("SHOW");

// //         // 10
// //         let number = expect("INTEGER");

// //         // ]
// //         expect("RIGHT_BRACKET");

// //         // Build AST
// //         return {
// //             type: "ShowStatement",
// //             expression: {
// //                 type: "IntegerLiteral",
// //                 value: number.value
// //             }
// //         };
// //     }

// //     return parse();
// // }

// // const ast = parser([
// //   { type: 'LEFT_BRACKET', value: '[' },
// //   { type: 'SHOW', value: 'show' },
// //   { type: 'INTEGER', value: 10 },
// //   { type: 'RIGHT_BRACKET', value: ']' }
// // ]);
// // console.log(ast);


// function parser(tokens){

// }

// const ast = {
//     type: "ShowStatement",
//     expression : {
//         type: "IntegerLiteral",
//         value : 10
//     }
// }


// export {parser}



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

    function parseShow() {
        expect("SHOW");

        const expression = parseInteger();

        expect("RIGHT_BRACKET");

        return {
            type: "ShowStatement",
            expression: expression
        };
    }

    function parse() {
        expect("LEFT_BRACKET");

        return parseShow();
    }

    return parse();
}

export { parser };