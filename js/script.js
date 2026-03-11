// ===== ПЛАВНЫЙ СКРОЛЛ =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

const target = document.querySelector(this.getAttribute("href"));

if(target){
e.preventDefault();
target.scrollIntoView({
behavior: "smooth"
});
}

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

if (phoneInput) {

phoneInput.addEventListener("input", formatPhone);
phoneInput.addEventListener("keydown", allowDelete);

function formatPhone(e){

let numbers = phoneInput.value.replace(/\D/g,'');

if(numbers.startsWith('7')) numbers = numbers.substring(1);
if(numbers.startsWith('8')) numbers = numbers.substring(1);

numbers = numbers.substring(0,10);

let result = "+7";

if(numbers.length > 0) result += " (" + numbers.substring(0,3);
if(numbers.length >= 4) result += ") " + numbers.substring(3,6);
if(numbers.length >= 7) result += "-" + numbers.substring(6,8);
if(numbers.length >= 9) result += "-" + numbers.substring(8,10);

phoneInput.value = result;

}

function allowDelete(e){

if(e.key === "Backspace"){
return true;
}

}

}


// ===== TELEGRAM ФОРМА =====

const botToken = "8543757769:AAGZhW-1zXsmyVXw0lW9tW2BT4hPs_EK6Xc";
const chatIds = ["381660343", "842558463"];


const form = document.querySelector("#contactForm");

if (form) {

form.addEventListener("submit", async function (e) {

e.preventDefault();

const button = form.querySelector('button[type="submit"]');
button.disabled = true;
button.innerText = "Отправка...";

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const city = document.getElementById("city").value;
const service = document.getElementById("service").value;
const message = document.getElementById("message").value;

const text =
"📩 Новая заявка с сайта DorPIS\n\n" +
"👤 Имя: " + name + "\n" +
"📞 Телефон: " + phone + "\n" +
"🏙 Город: " + city + "\n" +
"🛠 Вид работ: " + service + "\n" +
"💬 Комментарий: " + (message || "—");
  
try {

for (const id of chatIds) {

await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
chat_id: id,
text: text
})
});

}

if(!response.ok){
throw new Error("Request failed");
}

const toast = document.getElementById("successMessage");

if(toast){
toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},4000);
}

form.reset();

} catch (error) {

alert("Ошибка отправки");

}


setTimeout(()=>{

button.disabled = false;
button.innerText = "Отправить заявку";

},2000);
  
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

let auto = setInterval(nextSlide,5000);

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

// ===== СВАЙП В FULLSCREEN =====

let startXfs = 0;

viewer.addEventListener("touchstart", e => {
startXfs = e.touches[0].clientX;
});

viewer.addEventListener("touchend", e => {

let endXfs = e.changedTouches[0].clientX;

if(startXfs - endXfs > 50){
current++;
if(current >= images.length) current = 0;
show();
}

if(endXfs - startXfs > 50){
current--;
if(current < 0) current = images.length - 1;
show();
}

});

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

function showSuccess(){

const msg = document.getElementById("successMessage");

msg.classList.add("show");

setTimeout(()=>{
msg.classList.remove("show");
},4000);

}
