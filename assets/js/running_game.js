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

/** try to find specie-criteria-image combination which exists 
 *      and which has not been asked before
 * 
 * @param {*} difficulty 
 * @param {*} location 
 * @returns struct : {'Specie','Criteria','randImg'}
 */
function getPossibleQuest(difficulty,location,previousImages){
    let q = {};
    q.randImg = '';
    console.log('randImg is of type: ',typeof(q.randImg), ' and has the length: ',q.randImg.length);
    q.Specie = null;
    q.Criteria = '';
    let count = 0;
    while (true){
        q.Specie = selectRandomElement(species);
        q.Criteria = selectRandomElement(characteristic);
        q.randImg = selectRandomElement( getAvailablePictures( makeSpecieFoldername(q.Specie.latin[0]),q.Criteria ));
        if (previousImages.indexOf(q.randImg) > -1){q.randImg = ''};
        count++;
        if(count>99){break}
        if(q.randImg.length > 0){break} 
    }
    console.log(`I needed ${count} attempts to find a specie and criteria where at least one image is available`);
    console.log(`chosen image is ${q.randImg}`);
    return q;
}

function chooseCorrectAnswerText(specie){
    let correctAnswer = selectRandomElement( specie[language] );
    console.log(`correct answer is: ${correctAnswer}`);
    return correctAnswer
}

function chooseOffers(specie){
    let offers = [];
    let possible = removeElement(species.slice(),specie);
    while (offers.length < 3){
        let i = getRandomInt(possible.length);
        // let ad = possible.pop(i);
        offers.push(selectRandomElement( possible.pop(i)[language] ));
    }
    for(let o of offers){console.log(o);};
    return offers
}

function createQuestionHTMLStructure(quest,correctAnswer,possibleAnswers){
    // build question html structure
    let master = document.createElement('div');
    master.setAttribute('class','querryPicture');
    // question text
    let q = document.createElement('p');
    q.setAttribute('class','questText');
    switch (quest.Criteria){
        case 'bark':
            q.textContent = 'Judging be the bark which tree could it be?'; break;
        case 'leaf':
            q.textContent = 'Which tree has this leafes?'; break;
        case 'flower':
            q.textContent = 'On which tree can you see such flower?'; break;
        case 'bud':
            q.textContent = 'Which tree has such bud?'; break;
        case 'fruit':
            q.textContent = 'This is the fruit of which specie?'; break;
        case 'whole':
            q.textContent = 'Which tree appears as a whole like this?'; break;
        case 'wood':
            q.textContent = 'Which tree has such wood?'; break;
        default:
            q.textContent = `Which tree is it according to the criteria of ${querryCriteria}?`;
    };
    master.appendChild(q);
    
    let img = document.createElement('img');
    img.setAttribute('alt','quiz image, which tree sort is it?');
    
    console.log('trying to set img src to: '+quest.randImg);
    img.setAttribute('src',quest.randImg);
    master.appendChild(img);
    
    // mix possibleAnswers and correct solution
    possibleAnswers.push(correctAnswer);
    possibleAnswers = shuffle(possibleAnswers);
    // append possibleAnswers
    let lst = document.createElement('ol');
    for (let o of possibleAnswers){
        let it = document.createElement('it');
        it.textContent = o;
        it.addEventListener('click',nextQuestion);
        lst.appendChild(it);
    }
    master.appendChild(lst);
    return master;
}

function addQuestion(hist){
    // get a random specie and criteria (deselection rules later)
    quest = getPossibleQuest('easy','anywhere',hist.images);
    hist.images.push(quest.randImg);

    correctAnswer = chooseCorrectAnswerText(quest.Specie);
    offers        = chooseOffers(quest.Specie);

    questionHTML = createQuestionHTMLStructure(quest,correctAnswer,offers);

    // console.log(questionHTML.outerHTML);

    // append html structure to page
    let area = document.getElementById('quizSection');
    console.log(area.outerHTML);
    area.appendChild(questionHTML);
}

function nextQuestion(){
    console.log('Success');
}

let hist = {
    images: [],
}
addQuestion(hist);
console.log('game over');
});