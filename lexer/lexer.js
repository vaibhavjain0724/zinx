function lexer(code) {
    const tokens = [];

    const syntax = new Map();
    syntax.set("show", "SHOW");

    let i = 0;
    const size = code.length;

    while (i < size) {

        // Ignore whitespace
        if (code[i] === ' ') {
            i++;
            continue;
        }

        // Left bracket
        if (code[i] === '[') {
            tokens.push({
                type: "LEFT_BRACKET",
                value: "["
            });

            i++;
            continue;
        }

        // Right bracket
        if (code[i] === ']') {
            tokens.push({
                type: "RIGHT_BRACKET",
                value: "]"
            });

            i++;
            continue;
        }

        // Number
        if (code[i] >= '0' && code[i] <= '9') {
            let number = "";

            while (
                i < size &&
                code[i] >= '0' &&
                code[i] <= '9'
            ) {
                number += code[i];
                i++;
            }

            tokens.push({
                type: "INTEGER",
                value: Number(number)
            });

            continue;
        }

        // Identifier / keyword
        let keyword = "";

        while (
            i < size &&
            code[i] !== ' ' &&
            code[i] !== '[' &&
            code[i] !== ']'
        ) {
            keyword += code[i];
            i++;
        }

        if (syntax.has(keyword)) {
            tokens.push({
                type: syntax.get(keyword),
                value: keyword
            });
        } else {
            tokens.push({
                type: "IDENTIFIER",
                value: keyword
            });
        }
    }

    return tokens;
}


console.log(lexer("[show 10]"))