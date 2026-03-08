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
".service-card, .stat, .stage, .projects img"
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

const images = document.querySelectorAll(".projects img");

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

