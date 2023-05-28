document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    console.log('dom loaded');

const start = performance.now();

console.log(window.location);
// for (i in window.location){
//     console.log(i+' ');
// }
let geoLoc = localStorage.getItem("geoLoc"     ); 
let difficulty = localStorage.getItem("difficulty" ); 
let environment = localStorage.getItem("environment"); 
let language = localStorage.getItem("language"   ); 
let duration = localStorage.getItem("duration"   ); 

let time_needed = 999;
let nr_now = 0;
let time_start = performance.now();

console.log(geoLoc); 
console.log(difficulty); 
console.log(environment); 
console.log(language); 
console.log(duration); 
let duration_quest = localStorage.getItem('duration_quest');
console.log(duration_quest);
let duration_time = localStorage.getItem('duration_time');
console.log(duration_time);


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
        it.addEventListener('click',checkAnswer);
        lst.appendChild(it);
    }
    master.appendChild(lst);
    return master;
}

/** list all values of the attribute of elements in array
 * 
 * @param {array of structure elements} arr 
 * @param {Attribute} attr 
 */
function retrieveAttributeContentsOfArrayObjects(arr,attr){
    let ans = [];
    for (let a of arr){
        ans.push(a[attr]);
    };
    return ans;
}

/** checks wheather end condition is fullfilled
 * 
 * @returns boolean
 */
function checkEndReached(){
    let bool_end = false;
    console.log(`duration start ${time_start}`);
    console.log(`duration now ${performance.now()}`);
    console.log(`duration so far ${(performance.now()-time_start)/1000}`);
    console.log(`numbers of questions so far ${nr_now}`);
    if( duration=='open'){
        // pass;
    } else if( duration=='fixed_duration'){
        if( (performance.now()-time_start)/1000 > duration_time*60 ){
            time_needed = (performance.now()-time_start)/1000;
            bool_end = true;
        }
    } else if( duration=='fixed_questions'){
        if(nr_now == duration_quest){
            time_needed = (performance.now()-time_start)/1000;
            bool_end = true;
        }
    }
    return bool_end;
}

/** add next question to DOM
 * 
 * @param {struct} hist - structure containing used images so far and given answers and reached points
 */
function addQuestion(hist){
    if(checkEndReached()){
        evaluate();
        return ;
    } else {
        // pass;
    }
    nr_now += 1;
    hist.push(hist_template);
    let indexHist = hist.length - 1;
    // get a random specie and criteria (deselection rules later)
    console.log('hist of hist   : ',hist);
    let imgHist = retrieveAttributeContentsOfArrayObjects(hist,'images');
    console.log('hist of images: ',imgHist);
    quest = getPossibleQuest('easy','anywhere',imgHist);
    hist[indexHist].images.push(quest.randImg);

    correctAnswer = chooseCorrectAnswerText(quest.Specie);
    offers        = chooseOffers(quest.Specie);
    hist[indexHist].correctAnswer = correctAnswer;
    hist[indexHist].nrAnswers = offers.length;
    

    questionHTML = createQuestionHTMLStructure(quest,correctAnswer,offers);

    // console.log(questionHTML.outerHTML);

    // append html structure to page
    let area = document.getElementById('quizSection');
    console.log(area.outerHTML);
    area.appendChild(questionHTML);
}

function evaluate(){
    console.log('evalutae finally');
    let sec = document.getElementById('quizSection');
    for (let c of sec.children){
        c.hidden = false;
    }
}

function checkAnswer(){
    console.log('Success');
    console.log(this.textContent);
    let indexHist = hist.length - 1;
    // hist[indexHist].chosenItems.push(this);
    hist[indexHist].chosenAnswers.push(this.textContent);
    console.log('confirm: '+hist[indexHist].chosenAnswers[hist[indexHist].chosenAnswers.length-1]);
    // console.log(hist.chosenAnswer[hist.chosenAnswer.length-1]);
    // console.log(hist.correctAnswer[hist.correctAnswer.length-1]);
    // console.log(hist.chosenAnswer[hist.chosenAnswer.length-1]==hist.correctAnswer[hist.correctAnswer.length-1]);
    if(hist[indexHist].chosenAnswers[hist[indexHist].chosenAnswers.length-1]==hist[indexHist].correctAnswer){
        this.style.backgroundColor = "#11FF00";
        // console.log('color to green');
        nextQuestion();
    } else {
        this.style.backgroundColor = "#FF1100";
        // console.log('color to red');
        // points = 1 - n_wrong/n_wrong_max
        hist[indexHist].points = 1 - hist[indexHist].chosenAnswers.length*1/(hist[indexHist].nrAnswers);
    } 
    console.log(correctAnswer);
    console.log(hist);
    console.log('clicked');
    console.log(hist[indexHist].points);
}

function nextQuestion(){
    let quizSec = document.getElementById('quizSection');
    for (let c of quizSec.children){
        c.hidden = true;
    }
    addQuestion(hist);
}

let hist = [];
let hist_template = {
    questionIndex: null,
    images: [],
    points: 1,
    nrAnswers: 0,
    correctAnswer: '',
    chosenAnswers: [],
};
addQuestion(hist);
console.log(hist);
console.log('game over');


});