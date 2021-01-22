// Get all elements one and for all
var leftArrow = document.querySelector('.leftarrow');
var rightArrow = document.querySelector('.rightarrow');
var slides = document.querySelector('.triocards');
var ribbon = document.querySelector('.ribbon');
var selecusers = document.querySelector('#selecusers');
var selecseed = document.querySelector('#selecseed');
var userscards = document.querySelector('#userscards');
var seedcards = document.querySelector('#seedcards');
var herogo = document.querySelector('.herogo');
var whyogo = document.querySelector('.whyogo');
var testchan = document.querySelector('#exoduo');
var knowcards = document.querySelector('.knowcards');

userscards.className = "triocardhidden";
selecseed.className = "activeselectitle";

selecusers.addEventListener("click", () => {
  userscards.className = "ribbon";
  seedcards.className = "triocardhidden";
  selecusers.className = "activeselectitle";
  selecseed.className = "selectitle";
})

selecseed.addEventListener("click", () => {
  seedcards.className = "ribbon";
  userscards.className = "triocardhidden";
  selecseed.className = "activeselectitle";
  selecusers.className = "selectitle";
})

/*----------------------------- Slider */

//Get elements 
const allSlides = document.querySelectorAll(".cards");
const allSliders = document.querySelectorAll(".triocards");
const rightArrows = document.getElementsByClassName("rightarrow");
const leftArrows = document.getElementsByClassName("leftarrow");
let articlesClones = [];
let slides, slider, articles, slidesLength;
let canMove = true, moveFactor = 28;
let current = 0, previousArrows = [];


// Listeners
for(let i = 0; i < rightArrows.length; i++){
  rightArrows[i].addEventListener("click", slideToRight);
  leftArrows[i].addEventListener("click", slideToLeft);
}
window.addEventListener('resize', responsiveSlider);
responsiveSlider();

//functions 
function slideToRight(){
  getSlider(this);
  current++;
  if(canMove && current <= slidesLength){
    slide(-moveFactor*current, false);
    if (current === slidesLength) { 
      setTimeout(function() {
        current=0;
        jumpTo(0); 
      }, 300);
    } 
  }
}

function slideToLeft(){
  getSlider(this);
  current--;
  if(canMove && current >= -1){
    if (current === -1) { 
      jumpTo((-slidesLength)*moveFactor, function() { 
        current=4;
        slide(-moveFactor*current, false); 
      });
    } else {
      slide(-moveFactor*current, false);
    }
  }
}

function slide(nextPosition, jump){
  if (!jump) { 
    canMove = false;
    setTimeout(function() {
      canMove = true;
    }, 300);
  }
  if(moveFactor == 28){
    slides.style.transform = `translateX(${nextPosition-13}vw)`;
  } else{
    slides.style.transform = `translateX(${nextPosition-155}px)`;
  }
}

function jumpTo(newPosition, callback) {
  window.requestAnimationFrame(function() { 
    slides.style.transition = 'none'; 
    slide(newPosition, true);

    window.requestAnimationFrame(function() { 
      slides.style.transition = 'transform 300ms'; 
      
      if (callback) { 
        callback();
      }
    });
  });
}

function getSlider(elem){
  getArrow(elem);
  let sliderSection = elem.parentElement;
  slider = sliderSection.getElementsByClassName("slider")[0].offsetWidth;
  slides = sliderSection.getElementsByClassName("slides")[0];
  articles = slides.querySelectorAll('article');
  slidesLength = Number((slides.querySelectorAll('article').length) -4);
}

function getArrow(arrow){
  let otherArrow;
  // get the arrows clicked
  if(arrow.classList.contains("right-arrow")){
    otherArrow = arrow.parentElement.querySelector('.left-arrow');
  } else{
    otherArrow = arrow.parentElement.querySelector('.right-arrow');
  }

  // check if arrow is on another slider
  if(current != 0){
    checkChangedSlider(arrow, otherArrow, previousArrows);
  }

  // register the arrow clicked for next click to compare
  previousArrows = [arrow, otherArrow];

}

function checkChangedSlider(arrow1, arrow2, arrowTab){
  if(arrowTab[0] != arrow1 && arrowTab[0] != arrow2 && arrowTab[1] != arrow1 && arrowTab[1] != arrow2){
    current = 0;
  }
  resetPreviousSlider(arrowTab);
}

function resetPreviousSlider(arrowTab){
  if(arrowTab[0].parentElement.querySelector(".slides").length == 1000){
    arrowTab[0].parentElement.querySelector(".slides").style.transform = `translateX(-155px)`;
  } else{
    arrowTab[0].parentElement.querySelector(".slides").style.transform = `translateX(-13vw)`;
  }
}

// Adapt margin to slider size
function responsiveSlider(){
  current = 0;
  
  // suppress clones
  for(let i = articlesClones.length - 1 ; i >=0 ; i--){
    console.log(articlesClones[i].parentElement);
    if(articlesClones.length != 0){
      articlesClones[i].parentElement.removeChild(articlesClones[i]);
    }
  }
  articlesClones = [];

  //change slider if window size changed
  for(let i = 0; i < allSliders.length; i++){
    allSlides[i].style.transform = `translateX(0px)`;
    allSlides[i].querySelectorAll('article').forEach(article => {
      article.style.marginRight = '2vw';
    });
  }
  if(window.innerWidth >= 768){
    createClones();
    for(let i = 0; i < allSliders.length; i++){
      if(allSliders[i].offsetWidth == 1000){
        allSlides[i].style.transform = `translateX(-155px)`;
        allSlides[i].querySelectorAll('article').forEach(article => {
          article.style.marginRight = '23.3px';
          moveFactor = 1000/3;
        });
      } else{
        allSlides[i].style.transform = `translateX(-13vw)`;
        moveFactor = 28;
      }
    
    }
  }

}

function createClones(){
  if(window.innerWidth >= 768){
    // duplicate the slides
    for(let i = 0; i < allSlides.length ; i++){
      let one;
      one = allSlides[i].appendChild(allSlides[i].querySelector('article').cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[1].cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[2].cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[3].cloneNode(true));
      articlesClones.push(one);
    }
  }
}