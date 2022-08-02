const heroPlacholderImg = document.querySelector("section.hero img");
// lottie animations
const heroAnimation = document.querySelector("section.hero lottie-player");
const pressAnimation = document.querySelector("section.press lottie-player");
const reelAnimation = document.querySelector("section.style lottie-player");
const settingsAnimation = document.querySelector("section.settings lottie-player");
let heroPlayed = false;
// fade in placeholder image (heroAnimation frame 0)
document.addEventListener("DOMContentLoaded", () => heroPlacholderImg.style.opacity = 1);
// play hero animation when it's ready
heroAnimation.addEventListener("ready", () => {
  heroAnimation.style.opacity = 1;
  setTimeout(() => {
    heroPlacholderImg.style.visibility = "hidden";
    heroAnimation.play();
    heroPlayed = true;
  }, 600);
});
// scroll based animations
ScrollOut({
  onShown: function (element) {
    if (element.id == "hero-h1" && heroPlayed) {
      heroAnimation.play();
    } else if (element.id == "press-h1") {
      setTimeout(()=>pressAnimation.play(), 800);
    } else if (element.id == "style-h1") {
      reelAnimation.style.opacity = 1;
      reelAnimation.play();
    } 
  },
  onHidden: function (element) {
    if (element.id == "hero-h1") {
      heroAnimation.stop();
    } else if (element.id == "press-h1") {
      pressAnimation.pause();
    } else if (element.id == "style-h1") {
      reelAnimation.style.opacity = 0;
      reelAnimation.pause();
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