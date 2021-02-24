// About changing the type of cards
var selecusers = document.querySelector('#selecusers');
var selecseed = document.querySelector('#selecseed');
var userscards = document.querySelector('#userscards');
var seedcards = document.querySelector('#seedcards');

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

// On the topic of the hero
var herologo = document.querySelector('#herologo');
var hero = document.querySelector('#hero');
var loginput = document.querySelector('#loginput');
var medial = window.matchMedia("(max-width: 759px)");
var earth = 0
herologo.addEventListener('click', () => {   
  setTimeout(function() {
    herologo.classList.add("logonohover");
    earth ++;
    if (medial.matches) {
      hero.style.height = "397.5vw";
      hero.style.transition = "3s";}
    else {
      hero.style.height = "60vw";
      hero.style.transition = "1s";}
  }, 300)
});

function adaptheight(media) {
  if (earth == "1") {
    hero.style.transition = "0s"
    if (medial.matches) {
    hero.style.height = "397.5vw";
    } else {
    hero.style.height = "60vw";
    }
  }
}