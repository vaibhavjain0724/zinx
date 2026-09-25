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
            throw new Error(`Expected ${type}, but reached end of input`);
        }

        if (token.type !== type) {
            throw new Error(`Expected ${type}, got ${token.type}`);
        }

        return consume();
    }

    function is(type) {
        return peek() && peek().type === type;
    }

    function parseInteger() {
        return {
            type: "IntegerLiteral",
            value: expect("INTEGER").value
        };
    }

    function parseBoolean() {
        return {
            type: "BooleanLiteral",
            value: consume().type === "TRUE"
        };
    }

    function parseIdentifier() {
        return {
            type: "Identifier",
            name: expect("IDENTIFIER").value
        };
    }

    function parsePrimary() {
        if (is("INTEGER")) {
            return parseInteger();
        }

        if (is("TRUE") || is("FALSE")) {
            return parseBoolean();
        }

        if (is("IDENTIFIER")) {
            return parseIdentifier();
        }

        if (is("LEFT_PAREN")) {
            consume();
            const expression = parseExpression();
            expect("RIGHT_PAREN");
            return expression;
        }

        if (!peek()) {
            throw new Error("Expected an expression, but reached end of input");
        }

        throw new Error(`Unexpected token: ${peek().type}`);
    }

    function parseBinaryLevel(nextParser, operators) {
        let expression = nextParser();

        while (peek() && operators.includes(peek().type)) {
            const operator = consume();
            const right = nextParser();

            expression = {
                type: "BinaryExpression",
                operator: operator.value,
                left: expression,
                right: right
            };
        }

        return expression;
    }

    function parseMultiplication() {
        return parseBinaryLevel(parsePrimary, ["MULTIPLY", "DIVIDE"]);
    }

    function parseAddition() {
        return parseBinaryLevel(parseMultiplication, ["PLUS", "MINUS"]);
    }

    function parseComparison() {
        return parseBinaryLevel(parseAddition, ["GREATER"]);
    }

    function parseExpression() {
        return parseComparison();
    }

    function parseShow(parenthesized) {
        expect("SHOW");

        const statement = {
            type: "ShowStatement",
            expression: parseExpression()
        };

        if (parenthesized) {
            expect("RIGHT_PAREN");
        }

        return statement;
    }

    function parseVariableDeclaration(parenthesized) {
        expect("SET");

        const name = expect("IDENTIFIER");
        const statement = {
            type: "VariableDeclaration",
            name: name.value,
            value: parseExpression()
        };

        if (parenthesized) {
            expect("RIGHT_PAREN");
        }

        return statement;
    }

    function parseStatement() {
        if (is("SHOW")) {
            return parseShow(false);
        }

        if (is("SET")) {
            return parseVariableDeclaration(false);
        }

        if (is("LEFT_PAREN") && tokens[current + 1]?.type === "SHOW") {
            consume();
            return parseShow(true);
        }

        if (is("LEFT_PAREN") && tokens[current + 1]?.type === "SET") {
            consume();
            return parseVariableDeclaration(true);
        }

        return parseExpression();
    }

    const statements = [];

    while (current < tokens.length) {
        statements.push(parseStatement());
    }

    return {
        type: "Program",
        statements: statements
    };
}

export { parser };
