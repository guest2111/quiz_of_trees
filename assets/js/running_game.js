document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    // https://www.devdungeon.com/content/run-javascript-after-dom-fully-loaded
    console.log('dom loaded');

    let geoLoc = localStorage.getItem("geoLoc");
    let difficulty = localStorage.getItem("difficulty");
    let environment = localStorage.getItem("environment");
    let language = localStorage.getItem("language");
    let duration = localStorage.getItem("duration");
    let duration_quest = localStorage.getItem('duration_quest');
    let duration_time = localStorage.getItem('duration_time');

    let time_needed = 999;
    let nr_now = 0;
    let time_start = performance.now();

    // set up a warning on reload:
    // https://stackoverflow.com/questions/3527041/prevent-any-form-of-page-refresh-using-jquery-javascript
    window.onbeforeunload = function () {
        return "If you reload or leave, your game progress is lost and you start another game with same settings.";
    };

    /** try to find specie-criteria-image combination which exists 
     *      and which has not been asked before
     * 
     * @param {list} previousImages 
     * @returns struct : {'Specie','Criteria','randImg'}
     */
    function getPossibleQuest(previousImages) {
        let q = {};
        q.randImg = '';
        q.Specie = null;
        q.Criteria = '';
        let count = 0;
        while (true) {
            q.Specie = selectRandomElement(species);
            q.Criteria = selectRandomElement(characteristic);
            q.randImg = selectRandomElement(getAvailablePictures(makeSpecieFoldername(q.Specie.latin[0]), q.Criteria));
            if (previousImages.indexOf(q.randImg) > -1) { q.randImg = '' };
            count++;
            if (count > 99) { break; }
            if (q.randImg.length > 0) { break; }
        }
        console.log(`I needed ${count} attempts to find a specie and criteria where at least one image is available`);
        return q;
    }

    /** retrieve string for the correct answer given by object specie
     * 
     * @param {*} specie 
     * @returns {string}
     */
    function chooseCorrectAnswerText(specie) {
        let correctAnswer = selectRandomElement(specie[language]);
        return correctAnswer;
    }

    /** create alternative / wrong answers
     * 
     * @param {*} specie - will be excluded to not appear double 
     * @returns [list]
     */
    function chooseOffers(specie) {
        let offers = [];
        let possible = removeElement(species.slice(), specie);
        for (let o of offers){console.log(o)};
        // for (let o of possible){console.log(o.english)};
        while (offers.length < 3) {
            let i = getRandomInt(possible.length);
            // let ad = possible.pop(i);
            offers.push(selectRandomElement(possible[i][language]));
            possible.splice(i,1);
        }
        for (let o of offers){console.log(o)};
        return offers;
    }

    /** creating paragraph html element with a question fitting to criteria
     * 
     * @param {string} criteria 
     * @returns {HTML element}
     */
    function pQuestionText(criteria) {
        let q = document.createElement('p');
        q.setAttribute('class', 'questText');
        switch (criteria) {
            case 'bark':
                q.textContent = 'Judging by the bark which tree could it be?'; break;
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
                q.textContent = `Which tree is it according to the criteria of ${criteria}?`;
        }
        return q;
    }
    function createQuestionHTMLStructure(quest, correctAnswer, possibleAnswers) {
        // build question html structure
        let master = document.createElement('div');
        let div = document.createElement('span');
        div.setAttribute('class', 'imageWrapper');
        master.setAttribute('class', 'querryPicture');
        // question text
        let q = pQuestionText(quest.Criteria);
        div.appendChild(q);
        master.appendChild(div);

        let img = document.createElement('img');
        img.setAttribute('alt', 'quiz image, which tree sort is it?');
        makeImgZoomable(img);

        img.setAttribute('src', quest.randImg);
        div.appendChild(img);

        // mix possibleAnswers and correct solution
        possibleAnswers.push(correctAnswer);
        possibleAnswers = shuffle(possibleAnswers);
        // append possibleAnswers
        let lst = document.createElement('ul');
        for (let o of possibleAnswers) {
            let it = document.createElement('li');
            it.textContent = o;
            it.addEventListener('click', checkAnswer);
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
    function retrieveAttributeContentsOfArrayObjects(arr, attr) {
        let ans = [];
        for (let a of arr) {
            // ans.push(a[attr]);
            ans = ans.concat(a[attr]);
        }
        return ans;
    }

    /** checks wheather end condition is fullfilled
     * 
     * @returns boolean
     */
    function checkEndReached() {
        let bool_end = false;
        if (duration == 'open') {
            // pass;
        } else if (duration == 'fixed_duration') {
            if ((performance.now() - time_start) / 1000 > duration_time * 60) {
                time_needed = (performance.now() - time_start) / 1000;
                bool_end = true;
            }
        } else if (duration == 'fixed_questions') {
            if (nr_now == duration_quest) {
                time_needed = (performance.now() - time_start) / 1000;
                bool_end = true;
            }
        }
        return bool_end;
    }

    /** add next question to DOM
     * 
     * @param {struct} hist - structure containing used images so far and given answers and reached points
     */
    function addQuestion(hist) {
        if (checkEndReached()) {
            evaluate();
            return;
        } else {
            // pass;
        }
        nr_now += 1;
        hist.push(hist_template());
        let indexHist = hist.length - 1;

        // get a random specie and criteria 
        let imgHist = retrieveAttributeContentsOfArrayObjects(hist, 'images');
        let quest = getPossibleQuest(imgHist);
        hist[indexHist].images.push(quest.randImg);
        hist[indexHist].specie = quest.Specie;
        hist[indexHist].criteria.push(quest.Criteria);

        // collect correct answer and choose offers
        let correctAnswer = chooseCorrectAnswerText(quest.Specie);
        offers = chooseOffers(quest.Specie);
        hist[indexHist].correctAnswer = correctAnswer;
        hist[indexHist].nrAnswers = offers.length;

        // compose html structure
        let questionHTML = createQuestionHTMLStructure(quest, correctAnswer, offers);

        // append html structure to page
        let area = document.getElementById('quizSection');
        area.appendChild(questionHTML);
    }

    function removeEventRequestPicture() {
        let but = document.getElementById('requestPic');
        but.removeEventListener('click', anotherPicture);
    }
    function removeEventFinish() {
        let but = document.getElementById('finish');
        but.removeEventListener('click', evaluate);
    }

    /** evaluate the answer 
     * - remove ingame buttons
     * - add result overview (with reached points and needed time)
     * - unhide / show all questions, images and answers
     * - add button for restart or going back to settings
     */
    function evaluate() {
        // removing click events from items
        let its = document.getElementsByTagName('li');
        for (let it of its) {
            it.removeEventListener('click', checkAnswer);
        }
        // remove command button event
        removeEventRequestPicture();
        removeEventFinish();

        // adding topic
        let sec = document.getElementById('quizSection');
        let div = document.createElement('div');
        let secTot = (performance.now() - time_start) / 1000;
        let seconds = secTot % 60;
        let minutes = (secTot - seconds) / 60;
        let points = 0;
        for (let i = 0; i < hist.length; i++) {
            points += hist[i].points;
        }
        console.log('results');
        console.log(points);
        console.log(hist);
        div.setAttribute('class', 'result');
        div.innerHTML =
            `
        <h1> Results </h1>
        <div> You have needed <span class='resNum';>${minutes}</span> minutes and <span class='resNum';>${Math.floor(seconds)}</span> seconds.</div>
        <div> You have received <span class='resNum';>${Math.floor(points * 100) / 100}</span> out of <span class='resNum';>${hist.length}</span> maximal points.</div>
        `;
        insertAsFirstChild(sec, div);

        // show all quiz quests
        for (let c of sec.children) {
            c.hidden = false;
        }
        let ps = document.getElementsByClassName('questText');
        let imgs = document.getElementsByTagName('img');
        for (let c of ps) {
            c.hidden = false;
        }
        for (let c of imgs) {
            c.hidden = false;
            // reset zoom and remove zoomability
            removeZoomability(c);
        }

        // prevent image stacking:
        let quests = document.getElementsByClassName('querryPicture');
        for (let q of quests) {
            q.style.maxHeight = 'none';
        }

        // adjust possible actions
        hideCmdButtons();
        addBackToSettings();
        addStartAnew();

        // // giving space to new buttons (import for potrait orientation)
        sec.children[sec.children.length - 1].setAttribute('style', 'margin: 0 0 7.5vh 0; max-height: none;');

        window.onbeforeunload = '';
    }

    /** check given answer and change color of button accordingly
     * 
     */
    function checkAnswer() {
        let indexHist = hist.length - 1;
        // hist[indexHist].chosenItems.push(this);
        hist[indexHist].chosenAnswers.push(this.textContent);
        if (hist[indexHist].chosenAnswers[hist[indexHist].chosenAnswers.length - 1] == hist[indexHist].correctAnswer) {
            this.style.backgroundColor = "#11FF00";
            // console.log('color to green');
            nextQuestion();
        } else {
            this.style.backgroundColor = "#FF1100";
            // console.log('color to red');
            // points = 1 - n_wrong/n_wrong_max
            hist[indexHist].points = 1 - hist[indexHist].chosenAnswers.length * 1 / (hist[indexHist].nrAnswers);
        }
    }

    /** hide previous quest and add next one
     * 
     */
    function nextQuestion() {
        let quizSec = document.getElementById('quizSection');
        for (let c of quizSec.children) {
            c.hidden = true;
        }
        addQuestion(hist);
    }

    /** display another picture in quest
     *     - first hide previous picture
     *     - add question according to criteria 
     */
    function anotherPicture() {
        let quests = document.getElementsByClassName('imageWrapper');
        let last = quests[quests.length - 1];
        let ps = last.getElementsByTagName('p');
        for (let p of ps) {
            p.hidden = true;
        }
        let pics = last.getElementsByTagName('img');
        for (let img of pics) {
            img.hidden = true;
        }
        // get another picture
        let newPic = findAnotherPicture();
        let img = document.createElement('img');
        img.setAttribute('src', newPic);
        makeImgZoomable(img);
        last.appendChild(img);

        let crit = hist[hist.length - 1].criteria[hist[hist.length - 1].criteria.length - 1];
        let pnew = pQuestionText(crit);
        last.insertBefore(pnew, img);
    }

    /** find a new picture
     * first search for picture of a unused criteria in the question and then if not found any left available pictures
     * 
     * @returns {string} - path to picture
     */
    function findAnotherPicture() {
        let act = hist[hist.length - 1];
        let imgHist = retrieveAttributeContentsOfArrayObjects(hist, 'images');
        imgHist = imgHist.concat(act.images);
        let crits = characteristic;
        let critAv = [];
        for (let a of act.criteria) { critAv = removeElement(crits.slice(), a) }
        let crit;
        let imgPath = '';
        let count = 0;
        while (imgPath === '') {
            for (let countImg = 0; countImg < 50; countImg++) {
                crit = selectRandomElement(critAv);
                imgPath = selectRandomElement(getAvailablePictures(makeSpecieFoldername(act.specie.latin[0]), crit));
                if (imgPath != '') { break; }
            }
            if (imgHist.indexOf(imgPath) > -1) {
                imgPath = '';
            }
            count++;
            if (count > 100) { break; }
        }
        while (imgPath === '') {
            crit = selectRandomElement(crits);
            imgPath = selectRandomElement(getAvailablePictures(makeSpecieFoldername(act.specie.latin[0]), crit));
            if (imgHist.indexOf(imgPath) > -1) { imgPath = ''; }
            count++;
            if (count > 500) { break; }
        }
        if (imgPath != '') {
            act.criteria.push(crit);
            act.images.push(imgPath);
        } else { window.alert(`No other picture found for the given specie. Please choose ${act.correctAnswer}`); }
        return imgPath;
    }

    // wrapper for evaluate to remove EventListener from button before evaluating and don't give points for last question
    function evaluateByButton() {
        let btn = document.getElementById('finish');
        btn.removeEventListener('click', evaluate);
        // adjusting last quests answers
        let corAns = hist[hist.length - 1].correctAnswer;
        let sec = document.getElementById('quizSection');
        let lis = sec.children[sec.children.length - 1].children[1].children;
        console.log(corAns);
        for (let li of lis) {
            if (li.textContent != corAns) {
                li.style.backgroundColor = "#FF1100";
            }
        }
        hist[hist.length - 1].points = 0;
        // let corAns = hist[hist.length-1].correctAnswer;
        // console.log(corAns);
        evaluate();
    }


    /** add button "finish"
     */
    function addFinishButton() {
        let cmdArea = document.getElementById('commands');
        let div = cmdArea.children[0];
        let btn = document.createElement('button');
        btn.setAttribute("class", 'btn-group btn-cmd');
        btn.setAttribute("id", 'finish');
        btn.addEventListener('click', evaluateByButton);
        btn.textContent = 'Finish!';
        div.appendChild(btn);
    }

    /** add button to request another picture
     */
    function addRequestPictureButton() {
        let cmdArea = document.getElementById('commands');
        let div = cmdArea.children[0];
        let btn = document.createElement('button');
        btn.setAttribute("class", 'btn-group btn-cmd');
        btn.setAttribute("id", 'requestPic');
        btn.addEventListener('click', anotherPicture);
        btn.textContent = 'Give me another picture!';
        div.appendChild(btn);
    }

    // initialise history variable and prepare template to add to it
    let hist = [];
    function hist_template() {
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

    function backToSettings() {
        window.open("../../index.html", "_self");
    }

    function startAnew() {
        location.reload();
    }

    /** add button "start anew"
     */
    function addStartAnew() {
        let cmdArea = document.getElementById('commands');
        let div = cmdArea.children[0];
        let btn = document.createElement('button');
        btn.setAttribute("class", 'btn-group btn-cmd');
        btn.setAttribute("id", 'backToSettings');
        btn.addEventListener('click', startAnew);
        btn.textContent = 'Start again';
        div.appendChild(btn);
    }

    function hideCmdButtons() {
        let cmdArea = document.getElementById('commands');
        let div = cmdArea.children[0];
        // first hide other buttons
        for (let but of div.children) {
            but.setAttribute("hidden", "true");
        }
    }

    /** add button "back to settings" 
     */
    function addBackToSettings() {
        let cmdArea = document.getElementById('commands');
        let div = cmdArea.children[0];
        let btn = document.createElement('button');
        btn.setAttribute("class", 'btn-group btn-cmd');
        btn.setAttribute("id", 'backToSettings');
        btn.addEventListener('click', backToSettings);
        btn.textContent = 'Back to Settings';
        div.appendChild(btn);
    }

    addFinishButton();
    addRequestPictureButton();
    addQuestion(hist);

});
