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
function makeSpecieFoldername(specie){
    return specie.toLowerCase().replace(' ','_');
}

/** return random element of list
 * 
 * @param {list} species 
 * @returns element
 */
function selectRandomElement(elements){
    if (elements.length == 0){return []}
    let nmax = elements.length;
    return elements[getRandomInt(nmax)];
}
// -> selectRandomElement(species)
//    selectRandomElement(characteristic)

/** requesting available images for given specie and criteria
 * example: getAvailablePictures('quercus','bark')
 * @param {string} specie 
 * @param {string} criteria 
 * @returns list of image names
 */
function getAvailablePictures(specie,criteria){
    // console.log(`requesting images of ${criteria} of ${specie}`);
    let ans = [];
    for (let im of images){
        if (im.includes(specie) && im.includes(criteria)){
            ans.push(im);
        }
    }
    return ans;
}

// testing:
/*
console.log(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic));
console.log(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic));
console.log(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic));
console.log('pyrus','leaf')
console.log(getAvailablePictures('pyrus','leaf'));
console.log(getAvailablePictures(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic)));
console.log(getAvailablePictures(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic)));
console.log(getAvailablePictures(makeSpecieFoldername(selectRandomElement(species).latin[0]),selectRandomElement(characteristic)));
*/
