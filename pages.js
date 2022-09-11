"use strict";

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const morePages = document.getElementById("more");
const images = [...document.querySelectorAll("img.card-image")];
const page2 = document.getElementById("page-2");
const page6 = document.getElementById("page-6");
const cardsName = [...document.querySelectorAll("h2.card-name")];
const ten = document.getElementById("page-10");
const paginationContainer = document.querySelector("div.pagination");
let pageOptions = [...document.querySelectorAll("button.option")];

let deActivate = value => value.classList.remove("active");

let makeActive = index => {
    pageOptions.forEach(deActivate); 
    pageOptions[index].classList.add("active");
    pageOptions[index].innerHTML != "1" ? prevBtn.classList.add("active") : prevBtn.classList.remove("active");
    pageOptions[index].innerHTML != "10" ? nextBtn.classList.add("active") : nextBtn.classList.remove("active");
}

for(let i = 0; i < pageOptions.length; i++){
    pageOptions[i].addEventListener("click", () =>{
        makeActive(i)
        sessionStorage.setItem("currentPage", i);
        changeImage();
    })
}

pageOptions[0].click();

function changeOptions(){
    let hiddenPages = [...document.querySelectorAll("button.single-char.option.hide")];
    let shownPages = [...document.querySelectorAll("button.single-char.option.show")]; 

    hiddenPages.forEach((value) => {value.classList.replace("hide", "show")});
    shownPages.forEach((value) => {value.classList.replace("show", "hide")});
    page2.classList.contains("show") && page2.click();
    page6.classList.contains("show") && page6.click();
}

function changeImage(){
    let index = parseInt(sessionStorage.getItem("currentPage"));
    if(index !== 5){
        (index <= 5) ? index += 1 : index;
    
        for(let i = 0; i < images.length; i++){
            if(index == 1){
                cardsName[i].innerHTML = `Card 0${i + 1}`;
                images[i].src = `images/person${i + 1}.jpg`;
            }else if(index != 1 && index % 2 == 0){
                cardsName[i].innerHTML = `Card ${addZeros(2 * index + i)}`;
                images[i].src = `images/person${2 * index + i}.jpg`;
            }else if(index != 1 && index % 2 == 1){
                cardsName[i].innerHTML = `Card ${addZeros(2 * index + i + 1)}`
                images[i].src = `images/person${2 * index + i + 1}.jpg`;
            }
        }
    }
    
}

function addZeros(num){
    if(num < 10){ 
        let val = num.toString();
        val = val.padStart(2, "0");
        return val;
    }else{
        return num;
    }
}

morePages.addEventListener("click", changeOptions);

prevBtn.addEventListener("click", () => {
    if(prevBtn.classList.contains("active")){
        pageOptions[parseInt(sessionStorage.getItem("currentPage")) - 1].click();
    }
});

nextBtn.addEventListener("click", () => {
    if(nextBtn.classList.contains("active")){
        pageOptions[parseInt(sessionStorage.getItem("currentPage")) + 1].click();
    }
});