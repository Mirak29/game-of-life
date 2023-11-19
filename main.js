import { resize, canvas, menu, update } from "./game.js";

const start = document.getElementById("start");
const homeSound = document.getElementById("mainMenuAudio")
homeSound.play()

start.addEventListener("click", () => {
  homeSound.pause()
  const home = document.getElementById("start-screen");
  home.style.display = "none";
  document.body.style.background = "#252525"
  document.body.appendChild(canvas);
  resize();
  let alive = document.createElement("div")
  alive.textContent = "Alive cells"
  alive.className = "alive"
  let aliveCounter = document.createElement("div");
  aliveCounter.id = "liveCellCount";
  aliveCounter.textContent = "0";
  document.body.appendChild(alive);
  alive.appendChild(aliveCounter);
  window.addEventListener('resize', resize);
  menu()
  update();
});

