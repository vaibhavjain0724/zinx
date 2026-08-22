import { lexer } from "../src/lexer/lexer.js";
import { parser } from "../src/parser/parser.js";
import { interpret, outputArr, restart } from "../src/interpreter/interpreter.js";

import {updateHis , delHis , mostRecentHis, previousHis , nextHis} from "../src/history.js";

const codeElement = document.getElementById("code");
const runButton = document.getElementById("run");
const output = document.getElementById("output");
const tokensElement = document.getElementById("tokens");
const astElement = document.getElementById("ast");


runButton.addEventListener("click", () => {
    const code = codeElement.value;
    restart();
     runCode(code);
    updateHis(code);
});


const stepButton = document.getElementById("step");
stepButton.addEventListener("click" , () => {
    interpretUpd(currentAST);
})

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
const nextButton = document.getElementById("nextButton");

prevButton.addEventListener("click", () => {
    const code = previousHis();
    codeElement.value = code;
    runCode(code);
})

recentButton.addEventListener("click" , () => {
    const code = mostRecentHis();
    codeElement.value = code;
    runCode(code); 
})

deleteHis.addEventListener("click",  () => {
    delHis();
})

nextButton.addEventListener("click", () => {
    const code = nextHis();
    codeElement.value = code;
    runCode(code);
})

let currentAST;

function interpretUpd(ast){
    interpret(ast);
    updateOutput(output,  outputArr);
}

function runCode(code) {

    try {
        const tokens = lexer(code);
        console.log(tokens);
        
        //JSON.stringify() converts a JavaScript value/object into a string representation of JSON.
        currentAST = parser(tokens);
        setTimeout(() => {
            update(tokensElement, tokens)
        }, 500)
        
         setTimeout(() => {
            interpretUpd(currentAST);
        }, 900)
        console.log(currentAST);
        
    }
    catch(error){
        output.innerHTML = `Error ${error.message}`
        console.log(error);
    }


    
}



