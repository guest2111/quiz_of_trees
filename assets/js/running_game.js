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

// console.log('test push')
// let test = [];
// console.log(test);
// test.push('3');
// console.log(test);

// let test2 = {'a':[]};
// test2.a.push('b');
// console.log(test2);

console.log('test ende');
/** try to find specie-criteria-image combination which exists 
 *      and which has not been asked before
 * 
 * @param {*} difficulty 
 * @param {*} location 
 * @returns struct : {'Specie','Criteria','randImg'}
 */

window.onbeforeunload = function() {
    // window.alert("If you reload your game progress is lost and you start another game with same settings.");
    return '';
}

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

function pQuestionText(criteria){
    let q = document.createElement('p');
    q.setAttribute('class','questText');
    switch (criteria){
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
    return q;
}
function createQuestionHTMLStructure(quest,correctAnswer,possibleAnswers){
    // build question html structure
    let master = document.createElement('div');
    master.setAttribute('class','querryPicture');
    // question text
    let q = pQuestionText(quest.Criteria);
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
        // ans.push(a[attr]);
        ans = ans.concat(a[attr]);
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
    console.log('before');
    console.log(hist.length);
    console.log(hist);
    hist.push( hist_template() );
    console.log('after');
    console.log(hist.length);
    console.log(hist);
    let indexHist = hist.length - 1;
    // get a random specie and criteria (deselection rules later)
    console.log('hist of hist   : ',hist);
    let imgHist = retrieveAttributeContentsOfArrayObjects(hist,'images');
    console.log('hist of images: ',imgHist);
    quest = getPossibleQuest('easy','any',imgHist);
    hist[indexHist].images.push(quest.randImg);
    hist[indexHist].specie = quest.Specie;
    hist[indexHist].criteria.push(quest.Criteria);

    correctAnswer = chooseCorrectAnswerText(quest.Specie);
    offers        = chooseOffers(quest.Specie);
    hist[indexHist].correctAnswer = correctAnswer;
    hist[indexHist].nrAnswers = offers.length;
    

    questionHTML = createQuestionHTMLStructure(quest,correctAnswer,offers);

    // append html structure to page
    let area = document.getElementById('quizSection');
    console.log(area.outerHTML);
    area.appendChild(questionHTML);
}

function evaluate(){
    // removing click events from items
    let its = document.getElementsByTagName('it');
    for (let it of its){
        it.removeEventListener('click',checkAnswer);
    }
    console.log('evalutae finally');
    // adding topic
    let sec = document.getElementById('quizSection');
    let div = document.createElement('div');
    let secTot = (performance.now()-time_start)/1000 ; 
    let seconds = secTot%60;
    let minutes = (secTot-seconds)/60;
    let points = 0;
    for (let i=0; i<hist.length; i++){
        points += hist[i].points;
    };
    console.log('results');
    console.log(points);
    console.log(hist);
    div.setAttribute('class','result');
    div.innerHTML = 
        `
        <h1> Results </h1>
        <div> You have needed <span class='resNum';>${minutes}</span> minutes and <span class='resNum';>${Math.floor(seconds)}</span> seconds.</div>
        <div> You have received <span class='resNum';>${Math.floor(points*100)/100}</span> out of <span class='resNum';>${hist.length}</span> maximal points.</div>
        `;
    insertAsFirstChild(sec,div);
    for (let c of sec.children){
        c.hidden = false;
    }
    let ps = document.getElementsByClassName('questText');
    let imgs = document.getElementsByTagName('img');
    for (let c of ps){
        c.hidden = false;
    }
    for (let c of imgs){
        c.hidden = false;
    }
}

function checkAnswer(){
    console.log('Success');
    console.log(this.textContent);
    let indexHist = hist.length - 1;
    console.log(indexHist);
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
    console.log('calculate points for this one');
    console.log(hist[indexHist].chosenAnswers);
    console.log(`needed answers: ${hist[indexHist].chosenAnswers.length}`);
    console.log('number of possible answers: '+hist[indexHist].nrAnswers);
    console.log('points at actual question: '+ hist[indexHist].points);
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

function anotherPicture(){
    // console.log('requested another picture');
    // console.log(hist);
    let quests = document.getElementsByClassName('querryPicture');
    let last = quests[quests.length-1];
    let ps = last.getElementsByTagName('p');
    for(let p of ps){
        p.hidden = true;
    }
    let pics = last.getElementsByTagName('img');
    for(let img of pics){
        img.hidden = true;
    }
    // get another picture
    let newPic = findAnotherPicture();
    // let newPic = '/assets/images/nice_unspecific/IMG_20230514_140548.jpg';
    // insert
    let ol = last.getElementsByTagName('ol')[0];
    let img = document.createElement('img');
    img.setAttribute('src',newPic);
    last.insertBefore(img,ol);
    let crit = hist[hist.length-1].criteria[hist[hist.length-1].criteria.length - 1];
    let pnew = pQuestionText(crit);
    console.log('crit: ',crit);
    console.log(pnew.outerHTML);
    console.log(pnew.innerHTML);
    last.insertBefore(pnew,img);
}

function findAnotherPicture(){
    let act = hist[hist.length-1];
    let crits = characteristic;
    let critAv = [];
    for (a of act.criteria){ critAv = removeElement(crits.slice(),a)};
    let crit;
    let imgPath = '';
    let count = 0;
    // console.log(act);
    // console.log(`search for ${act.specie.german[0]}`);
    // console.log(act.images);
    // console.log(imgPath === '');
    console.log(crits)
    console.log(critAv);
    while (imgPath === ''){
    // for(let count = 0; count < 3; count++){
        console.log("A");
        for(let countImg=0; countImg < 50; countImg++){
            // console.log("B");
            crit = selectRandomElement(critAv);
            // console.log('special folder name: ',makeSpecieFoldername(act.specie.latin[0]),crit);
            // console.log('former pictures: ',act.images);
            // console.log('available pcitures:');
            // console.log(getAvailablePictures( makeSpecieFoldername(act.specie.latin[0]),crit ));
            imgPath = selectRandomElement( getAvailablePictures( makeSpecieFoldername(act.specie.latin[0]),crit ));
            // console.log(imgPath);
            if (imgPath != ''){break};
        };
        // console.log('test: '+imgPath);
        // console.log('act.images: ',act.images);
        // console.log('index: ',act.images.indexOf(imgPath));
        // console.log('imgPath: ',imgPath);
        if (act.images.indexOf(imgPath) > -1){
            imgPath = '';};
        count++;
        // if (imgPath.length > 0){break};
        if(count > 100){console.log('blalla',count);break;};
    }
    // if not found try with any criteria, even same
    while (imgPath === ''){
        crit = selectRandomElement(crits);
        imgPath = selectRandomElement( getAvailablePictures( makeSpecieFoldername(act.specie.latin[0]),crit ));
        if (act.images.indexOf(imgPath) > -1){imgPath = ''};
        count++;
        if(count > 500){console.log(count);break;};
    }
    if (imgPath != ''){
        // console.log(typeof(act));
        // console.log(typeof(act.criteria));
        // console.log(act.criteria.length);
        // console.log(act.criteria);
        // console.log('act',act);
        act.criteria.push(crit);
        act.images.push(imgPath);
    } else { window.alert(`No other picture found for the given specie. Please choose ${act.correctAnswer}`)};
    // console.log(imgPath != '');
    // console.log('found image: ' + imgPath);
    // console.log(act);
    return imgPath;
}

// wrapper for evaluate to remove EventListener from button before evaluating
function evaluateByButton(){
    let btn = document.getElementById('finish');
    btn.removeEventListener('click',evaluate);
    evaluate();
}
function addFinishButton(){
    let cmdArea = document.getElementById('commands');
    let div = cmdArea.children[0];
    let btn = document.createElement('button');
    btn.setAttribute("class",'btn-group btn-cmd');
    btn.setAttribute("id",'finish');
    btn.addEventListener('click',evaluate);
    btn.textContent = 'Finish!';
    div.appendChild(btn);
}

function addRequestPictureButton(){
    let cmdArea = document.getElementById('commands');
    let div = cmdArea.children[0];
    let btn = document.createElement('button');
    btn.setAttribute("class",'btn-group btn-cmd');
    btn.setAttribute("id",'requestPic');
    btn.addEventListener('click',anotherPicture);
    btn.textContent = 'Give me another picture!';
    div.appendChild(btn);
}

let hist = [];
function hist_template(){
    return {
        questionIndex: null,
        images: [],
        specie: null,
        criteria: [],
        points: 1,
        nrAnswers: 0,
        correctAnswer: '',
        chosenAnswers: [],
    };
}
addFinishButton();
addRequestPictureButton();
addQuestion(hist);
console.log(hist);
console.log('game over');


});