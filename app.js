import { lexer } from "./src/lexer/lexer.js";
import { parser } from "./src/parser/parser.js";
import { interpret, outputArr, restart } from "./src/interpreter/interpreter.js";

import { updateHis, delHis, mostRecentHis, previousHis, nextHis } from "./src/history.js";

const codeElement = document.getElementById("code");
const runButton = document.getElementById("run");
const output = document.getElementById("output");
const tokensElement = document.getElementById("tokens");
const astElement = document.getElementById("ast");
const highlightedCode = document.getElementById("highlightedCode");

function escapeHTML(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function highlightCode(code) {

    const tokens = lexer(code);

    let result = "";
    let position = 0;

    for (const token of tokens) {

        // Find where this token appears in the original source
        const value = String(token.value);
        const index = code.indexOf(value, position);

        // Add everything before this token unchanged
        result += escapeHTML(code.substring(position, index));

        // Add the highlighted token
        switch (token.type) {

            case "SHOW":
            case "SET":
                result += `<span class="keyword">${escapeHTML(value)}</span>`;
                break;

            case "TRUE":
            case "FALSE":
                result += `<span class="boolean">${escapeHTML(value)}</span>`;
                break;

            case "PLUS":
            case "MINUS":
            case "MULTIPLY":
            case "DIVIDE":
                result += `<span class="operator">${escapeHTML(value)}</span>`;
                break;

            case "INTEGER":
                result += `<span class="number">${escapeHTML(value)}</span>`;
                break;

            case "LEFT_PAREN":
            case "RIGHT_PAREN":
                result += `<span class="bracket">${escapeHTML(value)}</span>`;
                break;

            default:
                result += escapeHTML(value);
        }

        position = index + value.length;
    }

    // Add anything left after the final token
    result += escapeHTML(code.substring(position));

    return result;
}

// function highlightCode(code) {

//     const tokens = lexer(code);

//     return tokens.map(token => {

//         switch (token.type) {

//             case "SHOW":
//             case "SET":
//                 return `<span class="keyword">${token.value}</span>`;

//             case "TRUE":
//             case "FALSE":
//                 return `<span class="boolean">${token.value}</span>`;

//             case "PLUS":
//             case "MINUS":
//             case "MULTIPLY":
//             case "DIVIDE":
//                 return `<span class="operator">${token.value}</span>`;

//             case "INTEGER":
//                 return `<span class="number">${token.value}</span>`;

//             case "LEFT_PAREN":
//             case "RIGHT_PAREN":
//                 return `<span class="bracket">${token.value}</span>`;

//             default:
//                 return token.value;
//         }

//     }).join(" ");
// }

function updateHighlight() {
    highlightedCode.innerHTML = highlightCode(codeElement.value);
}
codeElement.addEventListener("input", updateHighlight);


function executeCode() {
    const code = codeElement.value;

    restart();
    runCode(code);
    updateHis(code);
}

runButton.addEventListener("click", () => {
   executeCode();
});

codeElement.addEventListener("keydown", (e) => {
    if (e.key == "Tab") {

        e.preventDefault();

        const start = codeElement.selectionStart;
        const end = codeElement.selectionEnd;

        codeElement.value = 
            codeElement.value.substring(0, start) + "    " + codeElement.value.substring(end);

        codeElement.selectionStart = start + 4;
        codeElement.selectionEnd = start + 4;


    }
    if( (e.metaKey || e.ctrlKey ) && e.key == "Enter"){
         e.preventDefault();
         executeCode();
       

    }


})



const stepButton = document.getElementById("step");
stepButton.addEventListener("click", () => {
    interpretUpd(currentAST);
})

function update(element, content) {
    element.textContent = JSON.stringify(content, null, 2);
    //The 2 means: indent nested objects by 2 spaces.
    //textContent = put text inside an element.
    //innerHTML = interpret the content as HTML.
}
function updateOutput(element, arr) {
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

recentButton.addEventListener("click", () => {
    const code = mostRecentHis();
    codeElement.value = code;
    runCode(code);
})

deleteHis.addEventListener("click", () => {
    delHis();
})

nextButton.addEventListener("click", () => {
    const code = nextHis();
    codeElement.value = code;
    runCode(code);
})

let currentAST;

function interpretUpd(ast) {
    interpret(ast);
    updateOutput(output, outputArr);
}

// function runCode(code) {

//     try {
//         const tokens = lexer(code);
//         console.log(tokens);

//         //JSON.stringify() converts a JavaScript value/object into a string representation of JSON.
//         currentAST = parser(tokens);
//         setTimeout(() => {
//             update(tokensElement, tokens)
//         }, 500)

//          setTimeout(() => {
//             interpretUpd(currentAST);
//         }, 900)
//         console.log(currentAST);

//     }
//     catch(error){
//         output.innerHTML = `Error ${error.message}`
//         console.log(error);
//     }



// }

function runCode(code) {

    try {
        const tokens = lexer(code);
        console.log(tokens);

        currentAST = parser(tokens);

        update(tokensElement, tokens);
        update(astElement, currentAST);

        interpretUpd(currentAST);

        console.log(currentAST);

    }
    catch (error) {
        output.innerHTML = `Error ${error.message}`;
        console.log(error);
    }
}



