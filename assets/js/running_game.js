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
    if(count>99){break}
    if(randImg.length > 0){break} 
}
console.log(`I needed ${count} attempts to find a specie and criteria where at least one image is available`);
console.log(`chosen image is ${randImg}`);

let correctAnswer = selectRandomElement( querrySpecie[language] );
console.log(`correct answer is: ${correctAnswer}`);
let offers = [];
let possible = removeElement(species.slice(),querrySpecie);
while (offers.length < 3){
    let i = getRandomInt(possible.length);
    // let ad = possible.pop(i);
    offers.push(selectRandomElement( possible.pop(i)[language] ));
}
for(let o of offers){console.log(o);};

// build question html structure
let master = document.createElement('p');
master.setAttribute('class','querryPicture');
// question text
let quest = document.createElement('p');
quest.setAttribute('class','questText');
switch (querryCriteria){
    case 'bark':
        quest.textContent = 'Judging be the bark which tree could it be?'; break;
    case 'leaf':
        quest.textContent = 'Which tree has this leafes?'; break;
    case 'flower':
        quest.textContent = 'On which tree can you see such flower?'; break;
    case 'bud':
        quest.textContent = 'Which tree has such bud?'; break;
    case 'fruit':
        quest.textContent = 'This is the fruit of which specie?'; break;
    case 'whole':
        quest.textContent = 'Which tree appears as a whole like this?'; break;
    case 'wood':
        quest.textContent = 'Which tree has such wood?'; break;
    default:
        quest.textContent = `Which tree is it according to the criteria of ${querryCriteria}?`;
};
master.appendChild(quest);

let img = document.createElement('img');
img.setAttribute('alt','quiz image, which tree sort is it?');

console.log('trying to set img src to: '+randImg);
img.setAttribute('src',randImg);
master.appendChild(img);

// mix offers and correct solution
offers.push(correctAnswer);
offers = shuffle(offers);
// append offers
let lst = document.createElement('ol');
for (let o of offers){
    let it = document.createElement('it');
    it.textContent = o;
    lst.appendChild(it);
}
master.appendChild(lst);

console.log(master.outerHTML);

// append html structure to page
let area = document.getElementById('quizSection');
console.log(area.outerHTML);
area.appendChild(master);

console.log('game over');


});