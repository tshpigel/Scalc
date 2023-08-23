document.querySelector("#next").addEventListener("click", () => {
    window.location.href = "./notes.html";
});

const degrad = document.querySelector("#dr");
const excrnd = document.querySelector("#er");
const snd = document.querySelector(".snd");

let smode = false;
let rmode = false;
let fmode = false;

snd.addEventListener("click", () => {
    snd.style.color = smode ? "rgba(0, 0, 0, 0.3)" : "#000";
    smode = !smode;
});

degrad.addEventListener("click", () => {
    degrad.textContent = rmode ? "RAD" : "DEG";
    rmode = !rmode;
});

excrnd.addEventListener("click", () => {
    excrnd.textContent = fmode ? "ROUND" : "EXACT";
    excrnd.classList.toggle("holding");
    fmode = !fmode;
});