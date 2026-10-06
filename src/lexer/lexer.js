function lexer(code) {
    const tokens = [];
    const keywords = new Map([
        ["show", "SHOW"],
        ["set", "SET"],
        ["true", "TRUE"],
        ["false", "FALSE"]
    ]);
    const twoCharacterOperators = new Map([
        ["==", "EQUAL"],
        ["!=", "NOT_EQUAL"],
        [">=", "GREATER_EQUAL"],
        ["<=", "LESS_EQUAL"]
    ]);
    const oneCharacterOperators = new Map([
        ["+", "PLUS"],
        ["-", "MINUS"],
        ["*", "MULTIPLY"],
        ["/", "DIVIDE"],
        [">", "GREATER"],
        ["<", "LESS"]
    ]);
    let i = 0;

    function isIdentifierStart(character) {
        return /[A-Za-z_]/.test(character);
    }

    function isIdentifierPart(character) {
        return /[A-Za-z0-9_]/.test(character);
    }

    while (i < code.length) {
        const character = code[i];

        if (/\s/.test(character)) {
            i++;
            continue;
        }

        if (character === "/" && code[i + 1] === "/") {
            while (i < code.length && code[i] !== "\n") {
                i++;
            }
            continue;
        }

        if (character === "(" || character === ")") {
            tokens.push({
                type: character === "(" ? "LEFT_PAREN" : "RIGHT_PAREN",
                value: character
            });
            i++;
            continue;
        }

        if (character === '"') {
            const start = i;
            let value = "";
            i++;

            while (i < code.length && code[i] !== '"') {
                if (code[i] === "\n") {
                    throw new Error("Unterminated string literal");
                }

                if (code[i] === "\\") {
                    const escapedCharacter = code[i + 1];

                    if (escapedCharacter === undefined) {
                        throw new Error("Unterminated string literal");
                    }

                    const escapes = {
                        '"': '"',
                        "\\": "\\",
                        n: "\n",
                        t: "\t"
                    };

                    if (!(escapedCharacter in escapes)) {
                        throw new Error(
                            `Unsupported escape sequence: \\${escapedCharacter}`
                        );
                    }

                    value += escapes[escapedCharacter];
                    i += 2;
                    continue;
                }

                value += code[i];
                i++;
            }

            if (i >= code.length) {
                throw new Error("Unterminated string literal");
            }

            i++;
            tokens.push({
                type: "STRING",
                value: value,
                raw: code.substring(start, i)
            });
            continue;
        }

        const twoCharacters = code.substring(i, i + 2);
        if (twoCharacterOperators.has(twoCharacters)) {
            tokens.push({
                type: twoCharacterOperators.get(twoCharacters),
                value: twoCharacters
            });
            i += 2;
            continue;
        }

        if (oneCharacterOperators.has(character)) {
            tokens.push({
                type: oneCharacterOperators.get(character),
                value: character
            });
            i++;
            continue;
        }

        if (character === "=" || character === "!") {
            throw new Error(`Invalid operator: ${character}`);
        }

        if (/[0-9]/.test(character)) {
            let number = "";

            while (i < code.length && /[0-9]/.test(code[i])) {
                number += code[i];
                i++;
            }

            if (i < code.length && isIdentifierStart(code[i])) {
                throw new Error(`Invalid identifier starting with a digit: ${number}${code[i]}`);
            }

            tokens.push({
                type: "INTEGER",
                value: Number(number)
            });
            continue;
        }

        if (isIdentifierStart(character)) {
            let identifier = "";

            while (i < code.length && isIdentifierPart(code[i])) {
                identifier += code[i];
                i++;
            }

            tokens.push({
                type: keywords.get(identifier) || "IDENTIFIER",
                value: identifier
            });
            continue;
        }

        throw new Error(`Unexpected character: ${character}`);
    }

    return tokens;
}

export { lexer };
