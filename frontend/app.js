import { lexer } from "../src/lexer/lexer.js";
import { parser } from "../src/parser/parser.js";
import { interpret, outputArr, clearOutput } from "../src/interpreter/interpreter.js";

const codeElement = document.getElementById("code");
const runButton = document.getElementById("run");
const output = document.getElementById("output");
const tokensElement = document.getElementById("tokens");
const astElement = document.getElementById("ast");
runButton.addEventListener("click", () => {
    const code = codeElement.value;

    runCode(code);
});

function runCode(code) {
    clearOutput();
    const tokens = lexer(code);

    console.log(tokens);
    tokensElement.innerHTML = tokensElement.textContent = JSON.stringify(tokens, null, 2);
    const ast = parser(tokens);
    astElement.innerHTML = astElement.textContent = JSON.stringify(ast, null, 2);
    console.log(ast);
    const value = interpret(ast);


    output.innerHTML = outputArr.join('\n');
    console.log(value);
}