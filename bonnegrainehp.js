// Get all elements one and for all
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