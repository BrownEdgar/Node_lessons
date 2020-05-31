const _ = require('lodash');


const arr = [ 122, 4, 5, 87, 33, 344, 2, "Seb"];
const arrObj = [
{
	_id: 2541,
	name: "Sevak"
}, 
{
	_id: 254659,
	name: "Karen"
},
{
	_id: 2541,
	name: "Valod"
}, ];


// const arr2 = [false, undefined, 11, -5, 54,true, ''];
// console.log("first", _.first(arr)); 
// console.log("chunk", _.chunk(arr, 2)); 
// console.log("compact", _.compact(arr2));
// console.log("drop", _.drop(arr)); 
// console.log("drop", _.drop(arr, 3)); 
// console.log("dropRight", _.dropRight(arr, 3)); 
// console.log("dropWhile", _.dropWhile(arr, function(item){ return item < 10 })); 
// console.log("dropRightWhile", _.dropRightWhile(arr, function (item) { return item < 10 }));
// console.log("fill", _.fill(arr, "Seb"));
// console.log("fill", _.fill(arr, "*", 2, 5)); //որտեղից-որտեղ փոխի *-ով
// console.log("findIndex()", _.findIndex(arr, function(i){ return i === 8 })); // -1 եթե չկա և եթե կա-կվերադարձնի էլեմենտի ինդեքսը
// console.log("findIndex() for obj", _.findIndex(arrObj, {name:"Valod"})); //- 1 եթե չկա և եթե կա - կվերադարձնի էլեմենտի ինդեքսը
//console.log("indexOf", _.indexOf(arr, "Seb")); 
//console.log("pull", _.pull(arr, "Seb", 33)); 
//console.log("join", _.join(arr, "+"));
//console.log("reverse", _.reverse(arr, "+"));
console.log("without", _.without(arr, 344, 4, 5, 33, 2)); 
/* 

"first" - Վերադարձնում է զանգվածի առաջին Էլեմենտը,
"chunk" - զանգվածի ամեն մի Էլեմենտը տեղադրում է նոր զանգվածի մեջ, կարող է ընդունել 2-րդ արգումենտ, որը նշանակում է Էլեմենտների քանակը,
"compact" - Վերադարձնում է զանգվածի արժեք ունեցող Էլեմենտները,
"drop" - Ջնջում է զանգվածի առաջին Էլեմենտը, կարող է ընդունել 2-րդ արգումենտ, որը նշանակում է Էլեմենտների քանակը,
"dropRight" - Ջնջում է զանգվածի վերջին  Էլեմենտը,  կարող է ընդունել 2-րդ արգումենտ, որը նշանակում է Էլեմենտների քանակը,
"dropWhile" - Ջնջում է զանգվածի Էլեմենտները մինչև առաջին հանդիպած էլեմենտը, որը բավարարում է պայմանին,
"dropRightWhile"- վերընշվածը- հակառակ
"fill" - փոխում է նույն զանգվածի բոլոր է-ը 2-րդ արգումենտով, 
"indexOf" - ջնջում է մասիվից փոխանցած արգումենտները իրական մասիվից
"pull" - ջնջում է մասիվից փոխանցած արգումենտները իրական մասիվից
"join" - aranqneri bajanarar
"reverse" - shrjwum 1 massivy
"without" - եթե Էլեմենտը գտնվել է ապա վերադարձնում է նրա index-ը  /  -1









*/





