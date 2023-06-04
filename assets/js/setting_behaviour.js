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
    enable_maxNumber();
}

function selecting_open(){
    disable_maxTime();
    disable_maxNumber();
}

function start_game(event){
    event.preventDefault();
    let form = document.getElementById('form_setting');
    localStorage.setItem("geoLoc",      form.elements['geoLoc'].value);
    localStorage.setItem("difficulty",  form.elements['difficulty'].value);
    localStorage.setItem("environment", form.elements['environment'].value);
    localStorage.setItem("language",    form.elements['language'].value);
    localStorage.setItem("duration",    form.elements['duration'].value);
    if (form.elements['duration'].value == 'fixed_questions'){
        localStorage.setItem("duration_quest", form.elements['duration_quest'].value);
    } else if (form.elements['duration'].value == 'fixed_duration'){
        localStorage.setItem("duration_time", form.elements['duration_time'].value);
    }
    form.submit();
}

let form = document.getElementById('form_setting');
form.addEventListener('submit',start_game);