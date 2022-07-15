const heroContainer = document.getElementById("hero-mockup");
const pressContainer = document.getElementById("press-feedback");
const reelContainer = document.getElementById("reel");
const settingsWindowContainer = document.getElementById("settings-window");
// lottie animations
document.addEventListener("DOMContentLoaded", () => {
  console.log("LOADED!");
});
const heroAnimation = bodymovin.loadAnimation({
  container: heroContainer,
  autoplay: false,
  loop: false,
  path: "keyviz/hero.json",
});
const pressAnimation = bodymovin.loadAnimation({
  container: pressContainer,
  renderer: "svg",
  autoplay: false,
  loop: true,
  path: "keyviz/press.json",
});
const reelAnimation = bodymovin.loadAnimation({
  container: reelContainer,
  renderer: "svg",
  autoplay: false,
  loop: true,
  path: "keyviz/reel.json",
});
const settingsAnimation = bodymovin.loadAnimation({
  container: settingsWindowContainer,
  renderer: "svg",
  autoplay: false,
  loop: true,
  path: "keyviz/settings.json",
});
setTimeout(()=>heroAnimation.play(), 1600);
// scroll based animations
ScrollOut({
  onShown: function (element) {
    if (element.id == "style-h1") {
      reelContainer.style.opacity = 1;
      reelAnimation.play();
    } else if (element.id == "settings-h1") {
      settingsAnimation.play();
      settingsWindowContainer.style.bottom = "-10%";
    } else if (element.id == "hero-mockup") {
      heroAnimation.play();
    } else if (element.id == "press-feedback") {
      pressAnimation.play();
    } 
  },
  onHidden: function (element) {
    if (element.id == "style-h1") {
      reelContainer.style.opacity = 0;
      reelAnimation.pause();
    } else if (element.id == "settings-h1") {
      settingsWindowContainer.style.bottom = "0%";
      settingsAnimation.pause();
    } else if (element.id == "hero-mockup") {
      heroAnimation.stop();
    } else if (element.id == "press-feedback") {
      pressAnimation.pause();
    } 
  }
});
// Expansion Panels
const panels = document.querySelectorAll(".expansion-panel");
panels.forEach((panel) => {
  panel.querySelector(".title").onclick = () => {
    const panelBody = panel.querySelector(".body");
    const icon = panel.querySelector(".icon");
    if (panelBody.classList.contains("close")) {
      panelBody.classList.remove("close");
      panelBody.classList.add("open");
      icon.innerHTML = "-";
      icon.style.transform = "rotate(180deg)";
    } else {
      panelBody.classList.remove("open");
      panelBody.classList.add("close");
      panel.querySelector(".icon").innerHTML = "+";
      icon.style.transform = "rotate(0deg)";
    }
  }
});