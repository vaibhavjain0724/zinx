import { lexer } from "../src/lexer/lexer.js";
import { parser } from "../src/parser/parser.js";
import { interpret, outputArr, clearOutput } from "../src/interpreter/interpreter.js";

import {updateHis , delHis , mostRecentHis, previousHis} from "../src/history.js";

const codeElement = document.getElementById("code");
const runButton = document.getElementById("run");
const output = document.getElementById("output");
const tokensElement = document.getElementById("tokens");
const astElement = document.getElementById("ast");
runButton.addEventListener("click", () => {
    const code = codeElement.value;

    runCode(code);
    updateHis(code);
});


function update(element, content){
    element.textContent = JSON.stringify(content, null , 2);
    //The 2 means: indent nested objects by 2 spaces.
    //textContent = put text inside an element.
    //innerHTML = interpret the content as HTML.
}
function updateOutput(element, arr){
    element.innerHTML = arr.join('\n');
}

const prevButton = document.getElementById("prevButton");
const recentButton = document.getElementById("recentButton");
const deleteHis = document.getElementById("deleteHis");
prevButton.addEventListener("click", () => {
    const code = previousHis();
    codeElement.value = code;
    runCode(code);
})

recentButton.addEventListener("click" , () => {
    const code = mostRecentHis();
    codeElement.textContent = code;
    runCode(code); 
})

deleteHis.addEventListener("click",  () => {
    delHis();
})


function runCode(code) {
    clearOutput();

    try {
        const tokens = lexer(code);
        console.log(tokens);
        
        //JSON.stringify() converts a JavaScript value/object into a string representation of JSON.
        const ast = parser(tokens);
        setTimeout(() => {
            update(tokensElement, tokens)
        }, 500)
         setTimeout(() => {
            update(astElement, ast)
        }, 900)
        console.log(ast);
        const value = interpret(ast);
         setTimeout(() => {
            updateOutput(output,  outputArr);
        }, 1100)
        console.log(value);
    }
    catch(error){
        output.innerHTML = `Error ${error.message}`
        console.log(error);
    }


    
}