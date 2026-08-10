import { lexer } from "../src/lexer/lexer.js";
import { parser } from "../src/parser/parser.js";
import { interpret } from "../src/interpreter/interpreter.js";

const codeElement = document.getElementById("code");
const runButton = document.getElementById("run");
const output = document.getElementById("output");

runButton.addEventListener("click", () => {
    const code = codeElement.value;

    runCode(code);
});

function runCode(code) {
    const tokens = lexer(code);
    console.log(tokens);
    const ast = parser(tokens);
    console.log(ast);
    const value = interpret(ast);

    output.innerHTML = value;
}