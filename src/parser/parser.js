function parser(tokens) {

    let current = 0;

    function peek() {
        return tokens[current];
    }

    function consume() {
        return tokens[current++];
    }

    function expect(type) {
        const token = peek();

        if (!token) {
            throw new Error(
                `Expected ${type}, but reached end of input`
            );
        }

        if (token.type !== type) {
            throw new Error(
                `Expected ${type}, got ${token.type}`
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

    function parseIdentifier() {
        const token = expect("IDENTIFIER");

        return {
            type: "Identifier",
            name: token.value
        };
    }

    function parseExpression() {

        if (peek().type === "INTEGER") {
            return parseInteger();
        }

        if (peek().type === "IDENTIFIER") {
            return parseIdentifier();
        }
        

        if (peek().type === "LEFT_PAREN") {
            return parseCompoundExpression();
        }

        throw new Error(
            `Unexpected token: ${peek().type}`
        );
    }

    function parseShow() {
        expect("SHOW");

        const expression = parseExpression();

        expect("RIGHT_PAREN");

        return {
            type: "ShowStatement",
            expression: expression
        };
    }

    function parseVariableDeclaration() {
        expect("SET");

        const name = expect("IDENTIFIER");

        const value = parseExpression();

        expect("RIGHT_PAREN");

        return {
            type: "VariableDeclaration",
            name: name.value,
            value: value
        };
    }

    function parseBinaryExpression() {
        const operator = consume();

        const left = parseExpression();
        const right = parseExpression();

        expect("RIGHT_PAREN");

        return {
            type: "BinaryExpression",
            operator: operator.value,
            left: left,
            right: right
        };
    }

    function parseCompoundExpression() {

        expect("LEFT_PAREN");

        const operator = peek();

        if (operator.type === "SHOW") {
            return parseShow();
        }

        if (operator.type === "SET") {
            return parseVariableDeclaration();
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

        const statements = [];

        while (current < tokens.length) {
            statements.push(parseExpression());
        }

        return {
            type: "Program",
            statements: statements
        };
    }

    return parse();
}

export { parser };