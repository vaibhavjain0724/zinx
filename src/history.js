// let codeStack =localStorage.getItem("history");
// let counter = localStorage.getItem("counter");
// if(counter == null){
//     counter = 0;
// }
// else counter = JSON.parse(counter);
// if(codeStack == null ) codeStack = [];
// else codeStack = JSON.parse(codeStack);
// function previousHis(){

//     if(counter >= codeStack.length) return "";

//     counter++;

//     const toreturn = codeStack[codeStack.length - 1 - counter];
//     localStorage.setItem("counter", JSON.stringify(counter));
//     return toreturn;
// }
// function mostRecentHis(){
//     if(codeStack.length == 0) return "";
//     return codeStack[codeStack.length -1];
// }

// function updateHis(code){
//     codeStack.push(code);
//     localStorage.setItem("history" , JSON.stringify(codeStack));
// }

// function delHis(){
//    localStorage.removeItem("history");
//    localStorage.removeItem("counter");
// ;}

// function nextHis(){

//     if(counter < 0) return "";

//     counter--;

//     return codeStack[code.length  - 1 - counter];
//     localStorage.setItem("counter", JSON.stringify(counter));
// }
// export {previousHis, delHis, updateHis, mostRecentHis, nextHis};
let codeStack = localStorage.getItem("history");
let counter = localStorage.getItem("counter");

if (counter == null) {
    counter = 0;
} else {
    counter = JSON.parse(counter);
}

if (codeStack == null) {
    codeStack = [];
} else {
    codeStack = JSON.parse(codeStack);
}


function previousHis() {

    if (codeStack.length === 0) {
        return "";
    }

    if (counter < codeStack.length - 1) {
        counter++;
        localStorage.setItem("counter", JSON.stringify(counter));
    }

    return codeStack[codeStack.length - 1 - counter];
}


function nextHis() {

    if (codeStack.length === 0) {
        return "";
    }

    if (counter > 0) {
        counter--;
        localStorage.setItem("counter", JSON.stringify(counter));
    }

    return codeStack[codeStack.length - 1 - counter];
}


function mostRecentHis() {

    if (codeStack.length === 0) {
        return "";
    }

    counter = 0;

    localStorage.setItem(
        "counter",
        JSON.stringify(counter)
    );

    return codeStack[codeStack.length - 1];
}


function updateHis(code) {

    codeStack.push(code);

    counter = 0;

    localStorage.setItem(
        "history",
        JSON.stringify(codeStack)
    );

    localStorage.setItem(
        "counter",
        JSON.stringify(counter)
    );
}


function delHis() {

    codeStack = [];
    counter = 0;

    localStorage.removeItem("history");
    localStorage.removeItem("counter");
}


export {
    previousHis,
    nextHis,
    delHis,
    updateHis,
    mostRecentHis
};