document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    console.log('dom loaded');

console.log(window.location);
// for (i in window.location){
//     console.log(i+' ');
// }
let geoLoc = localStorage.getItem("geoLoc"     ); 
let difficulty = localStorage.getItem("difficulty" ); 
let environment = localStorage.getItem("environment"); 
let language = localStorage.getItem("language"   ); 
let duration = localStorage.getItem("duration"   ); 

console.log(geoLoc); 
console.log(difficulty); 
console.log(environment); 
console.log(language); 
console.log(duration); 
if (duration == 'fixed_questions'){
    let duration_quest = localStorage.getItem('duration_quest');
    console.log(duration_quest);
} else if (duration == 'fixed_duration'){
    let duration_time = localStorage.getItem('duration_time');
    console.log(duration_time);
}

// get a random specie and criteria (deselection rules later)
let randImg = '';
console.log('randImg is of type: ',typeof(randImg), ' and has the length: ',randImg.length);
let querrySpecie = null;
let querryCriteria = '';
let count = 0;
while (true){
    querrySpecie = selectRandomElement(species);
    querryCriteria = selectRandomElement(characteristic);
    randImg = selectRandomElement( getAvailablePictures( makeSpecieFoldername(querrySpecie.latin[0]),querryCriteria ));
    count++;
    if(count>10){break}
    if(randImg.length > 0){break} 
}
console.log(`I needed ${count} attempts to find a specie and criteria where at least one image is available`);
console.log(`chosen image is ${randImg}`);

let offers = [];
let possible = species.slice();
while (offers.length < 3){
    let i = getRandomInt(possible.length);
    // let ad = possible.pop(i);
    offers.push(selectRandomElement( possible.pop(i).german ));
}
for(let o of offers){console.log(o);};

// build question html structure
let master = document.createElement('p');
master.setAttribute('class','querryPicture');
let img = document.createElement('img');
img.setAttribute('alt','quiz image, which tree sort is it?');

console.log('trying to set img src to: '+randImg);
img.setAttribute('src',randImg);
master.appendChild(img);
console.log(master.outerHTML);

// append html structure to page
let area = document.getElementById('quizSection');
console.log(area.outerHTML);
area.appendChild(master);

console.log('game over');


});