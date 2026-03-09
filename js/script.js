// ===== ПЛАВНЫЙ СКРОЛЛ =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});

});

});



// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

const elements = document.querySelectorAll(
".service-card, .stat, .stage, .project-card"
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



// ===== МАСКА ТЕЛЕФОНА =====

const phoneInput = document.getElementById("phone");

if(phoneInput){

phoneInput.addEventListener("input", function(){

let numbers = this.value.replace(/\D/g,'');

if(numbers.startsWith('8')) numbers = numbers.substring(1);
if(numbers.startsWith('7')) numbers = numbers.substring(1);

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

}



// ===== TELEGRAM ФОРМА =====

const form = document.getElementById("contactForm");

if(form){

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

alert("Заявка отправлена");

form.reset();

});

}



// ===== СЛАЙДЕРЫ =====

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



// ===== АВТОПРОКРУТКА =====

let auto = setInterval(nextSlide,4000);

slider.addEventListener("mouseenter",()=>{
clearInterval(auto);
});

slider.addEventListener("mouseleave",()=>{
auto = setInterval(nextSlide,4000);
});



// ===== СВАЙП =====

let startX = 0;

slides.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e=>{

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50) nextSlide();
if(endX - startX > 50) prevSlide();

});



// ===== FULLSCREEN =====

images.forEach((img,i)=>{

img.addEventListener("click",()=>{

let current = i;

const viewer = document.createElement("div");
viewer.className="gallery-view";

const bigImg = document.createElement("img");
bigImg.src = images[current].src;

const close = document.createElement("div");
close.className="gallery-close";
close.innerHTML="✕";

const next = document.createElement("div");
next.className="gallery-next";
next.innerHTML="❯";

const prev = document.createElement("div");
prev.className="gallery-prev";
prev.innerHTML="❮";

viewer.appendChild(bigImg);
viewer.appendChild(close);
viewer.appendChild(next);
viewer.appendChild(prev);

document.body.appendChild(viewer);

function show(){
bigImg.src = images[current].src;
}

next.onclick=()=>{
current++;
if(current>=images.length) current=0;
show();
};

prev.onclick=()=>{
current--;
if(current<0) current=images.length-1;
show();
};

close.onclick=()=>{
viewer.remove();
};

viewer.onclick=e=>{
if(e.target===viewer) viewer.remove();
};

});

});

});
