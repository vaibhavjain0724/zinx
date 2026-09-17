 
function lexer(code) {
    const tokens = [];

    const syntax = new Map();
    syntax.set("show", "SHOW");
    syntax.set("+", "PLUS");
    syntax.set("-", "MINUS");
    syntax.set("*", "MULTIPLY");
    syntax.set("/", "DIVIDE");
    syntax.set("set" , "SET");
    let i = 0;
    const size = code.length;

    while (i < size) {

        if (/\s/.test(code[i])) {
            i++;
            continue;
        }

        if (code[i] === "/" && code[i + 1] === "/") {
            while (i < size && code[i] !== "\n") {
                i++;
            }

            continue;
        }

        if (code[i] === '(') {
            tokens.push({
                type: "LEFT_PAREN",
                value: "("
            });

            i++;
            continue;
        }

        if (code[i] === ')') {
            tokens.push({
                type: "RIGHT_PAREN",
                value: ")"
            });

            i++;
            continue;
        }

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

        let keyword = "";

        while (
            i < size &&
            !/\s/.test(code[i]) &&
            code[i] !== '(' &&
            code[i] !== ')'
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

export { lexer };