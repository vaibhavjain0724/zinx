let codeStack = [];
let counter = 0;

function previousHis(){
    if(currentPointer <= 0) return "";
    return codeStack[codeStack.length - 1 - counter++];
}
function mostRecentHis(){
    return codeStack[codeStack.length -1];
}

function updateHis(code){
    codeStack.push(code);
}

function delHis(){
   codeStack = [];
}
export {previousHis, delHis, updateHis, mostRecentHis};