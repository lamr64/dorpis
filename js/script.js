// ===== ПЛАВНЫЙ СКРОЛЛ =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e) {

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

const hiddenElements = document.querySelectorAll(".service-card, .stat, .stage, .projects img");

hiddenElements.forEach(el => {

el.classList.add("hidden");

observer.observe(el);

});



// ===== TELEGRAM ФОРМА =====

const botToken = "ВСТАВЬ_СЮДА_BOT_TOKEN";
const chatId = "ВСТАВЬ_СЮДА_CHAT_ID";

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

const inputs = form.querySelectorAll("input, textarea");

let text = "Новая заявка с сайта:%0A%0A";

inputs.forEach(input => {

text += input.placeholder + ": " + input.value + "%0A";

});

fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)

.then(() => {

alert("Заявка отправлена!");

form.reset();

})

.catch(() => {

alert("Ошибка отправки");

});

});

}



// ===== ЭФФЕКТ КНОПОК =====

document.querySelectorAll(".button-primary").forEach(btn => {

btn.addEventListener("mouseenter", () => {

btn.style.transform = "translateY(-3px)";

});

btn.addEventListener("mouseleave", () => {

btn.style.transform = "translateY(0)";

});

});