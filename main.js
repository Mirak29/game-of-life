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
  window.addEventListener('resize', resize);
  menu()
  update();
});

