
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

console.log('game over');