// ===== Chat bot ========

const botToken = "8543757769:AAGZhW-1zXsmyVXw0lW9tW2BT4hPs_EK6Xc";
const chatId = "CHAT_ID";

// ===== ПЛАВНЫЙ СКРОЛЛ =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});

});

});



// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ =====

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

const elements = document.querySelectorAll(
".service-card, .stat, .stage, .projects-grid img"
);

elements.forEach(el => {

el.classList.add("hidden");

observer.observe(el);

});



// ===== PARALLAX HERO =====

window.addEventListener("scroll", () => {

const hero = document.querySelector(".hero");

if(hero){

let offset = window.pageYOffset;

hero.style.backgroundPositionY = offset * 0.4 + "px";

}

});



// ===== LIGHTBOX ГАЛЕРЕЯ =====

const images = document.querySelectorAll(".slides img");

images.forEach(img => {

img.addEventListener("click", () => {

const overlay = document.createElement("div");

overlay.classList.add("lightbox");

const bigImg = document.createElement("img");

bigImg.src = img.src;

overlay.appendChild(bigImg);

document.body.appendChild(overlay);

overlay.addEventListener("click", () => {

overlay.remove();

});

});

});

// маска телефона

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function(){

let numbers = this.value.replace(/\D/g,'');

if(numbers.startsWith('8')){
numbers = numbers.substring(1);
}

if(numbers.startsWith('7')){
numbers = numbers.substring(1);
}

let formatted = "+7 ";

if(numbers.length > 0)
formatted += "(" + numbers.substring(0,3);

if(numbers.length >= 3)
formatted += ") " + numbers.substring(3,6);

if(numbers.length >= 6)
formatted += "-" + numbers.substring(6,8);

if(numbers.length >= 8)
formatted += "-" + numbers.substring(8,10);

this.value = formatted;

});


// ===== TELEGRAM ФОРМА =====

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const city = document.getElementById("city").value;
const service = document.getElementById("service").value;
const message = document.getElementById("message").value;

const text = `
Новая заявка с сайта DorPIS

Имя: ${name}
Телефон: ${phone}
Город: ${city}
Вид работ: ${service}
Комментарий: ${message}
`;

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
chat_id: chatId,
text: text
})

}).then(()=>{

alert("Заявка отправлена");

form.reset();

});

});

document.querySelectorAll(".slider").forEach(slider => {

const slides = slider.querySelector(".slides");
const images = slides.querySelectorAll("img");

let index = 0;

function showSlide(i){
slides.style.transform = `translateX(-${i*100}%)`;
}

function nextSlide(){
index++;
if(index >= images.length) index = 0;
showSlide(index);
}

function prevSlide(){
index--;
if(index < 0) index = images.length-1;
showSlide(index);
}

slider.querySelector(".next").onclick = nextSlide;
slider.querySelector(".prev").onclick = prevSlide;


/* автопрокрутка */

let auto = setInterval(nextSlide,4000);

slider.addEventListener("mouseenter",()=>{
clearInterval(auto);
});

slider.addEventListener("mouseleave",()=>{
auto = setInterval(nextSlide,4000);
});


/* swipe */

let startX = 0;

slides.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e=>{

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50) nextSlide();
if(endX - startX > 50) prevSlide();

});


/* fullscreen */

images.forEach(img=>{

img.addEventListener("click",()=>{

const viewer = document.createElement("div");
viewer.className="gallery-view";

const bigImg = document.createElement("img");
bigImg.src = img.src;

const close = document.createElement("div");
close.className="gallery-close";
close.innerHTML="✕";

viewer.appendChild(bigImg);
viewer.appendChild(close);

document.body.appendChild(viewer);

close.onclick=()=>{
viewer.remove();
};

viewer.onclick=e=>{
if(e.target===viewer) viewer.remove();
};

});

});

});
