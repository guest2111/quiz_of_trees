function disable_maxTime(){
    let inpElm = document.getElementById("duration_minutes");
    inpElm.setAttribute('disabled',"True");
    inpElm.value = "";
}
function enable_maxTime(){
    let inpElm = document.getElementById("duration_minutes");
    inpElm.removeAttribute('disabled');
}
function disable_maxNumber(){
    let inpElm = document.getElementById("number_questions");
    inpElm.setAttribute('disabled',"True");
    inpElm.value = "";
}
function enable_maxNumber(){
    let inpElm = document.getElementById("number_questions");
    inpElm.removeAttribute('disabled');
}

function selecting_maxTime(){
    enable_maxTime();
    disable_maxNumber();
}

function selecting_maxNumber(){
    console.log("selecting_maxNumber called");
    disable_maxTime();
    console.log('1');
    enable_maxNumber();
    console.log('2');
}

function selecting_open(){
    disable_maxTime();
    disable_maxNumber();
}
