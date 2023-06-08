/** create a random integer number between 0 and <max>
 * 
 * @param {int} max 
 * @returns {int}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/** make lowercased and replace white space
 * 
 * @param {string} specie 
 * @returns specie_transformed
 */
function makeSpecieFoldername(specie) {
    return specie.toLowerCase().replace(' ', '_');
}

/** add the newNode as first child to the element of parentID regardless of how many children already exist
 * 
 * @param {string} parentID - ID of parent element 
 * @param {HTMLElement} newNode - element created with document.createElement() 
 */
function insertAsFirstChild(parentID, newNode) {
    let pN = null;
    if (typeof (parentID) == 'string') {
        pN = document.getElementById(parentID);
    } else if (typeof (parentID) == 'object') {
        pN = parentID;
    }
    if (pN.children.length > 0) {
        let firstChild = pN.children[0];
        pN.insertBefore(newNode, firstChild);
    } else {
        pN.appendChild(newNode);
    }
}

/** return random element of list
 * usage: specie = selectRandomElement(species)
 *        chriteria = selectRandomElement(characteristics)
 * 
 * @param {list} species 
 * @returns element
 */
function selectRandomElement(elements) {
    if (elements.length == 0) { return [] };
    let nmax = elements.length;
    return elements[getRandomInt(nmax)];
}

/** requesting available images for given specie and criteria
 * example: getAvailablePictures('quercus','bark')
 * @param {string} specie 
 * @param {string} criteria 
 * @returns list of image names
 */
function getAvailablePictures(specie, criteria) {
    // console.log(`requesting images of ${criteria} of ${specie}`);
    let ans = [];
    for (let im of images) {
        if (im.includes(specie) && im.includes(criteria)) {
            ans.push(im);
        }
    }
    return ans;
}

/** removes first occurence of element from array and returns array
 * 
 * @param {list} array 
 * @param {*} element 
 * @returns list 
 */
function removeElement(array, element) {
    let i = array.indexOf(element);
    if (i > -1) {
        array.splice(i, 1);
    }
    return array;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * -> https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/** remove zoom functions from events and call resetImgZoom()
 * 
 * @param {*} img 
 */
function removeZoomability(img) {
    resetImgZoom(img);
    // img.removeEventListener
    img.onmousedown = '';
    img.onmouseup = '';
    img.onwheel = '';
    img.onmousemove = '';
}

/** reset the zoom done by makeImgZoomable()
 * 
 * @param {HTML_img_object} img 
 */
function resetImgZoom(img) {
    img.style.transform = "translate(0px,0px) scale(1)";
}

// make image zoomable
// https://dev.to/stackfindover/zoom-image-point-with-mouse-wheel-11n3
function makeImgZoomable(img) {
    var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 };

    function setTransform() {
        img.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }

    img.onmousedown = function (e) {
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    }

    img.onmouseup = function (e) {
        panning = false;
    }

    img.onmousemove = function (e) {
        e.preventDefault();
        if (!panning) {
            return;
        }
        pointX = (e.clientX - start.x);
        pointY = (e.clientY - start.y);
        setTransform();
    }

    img.onwheel = function (e) {
        e.preventDefault();
        var xs = (e.clientX - pointX) / scale,
            ys = (e.clientY - pointY) / scale,
            delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;

        setTransform();
    }
}