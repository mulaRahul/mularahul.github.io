// lottie animations
const heroAnimation = document.querySelector("section.hero lottie-player");
const pressAnimation = document.querySelector("section.press lottie-player");
const reelAnimation = document.querySelector("section.style lottie-player");
const settingsAnimation = document.querySelector("section.settings lottie-player");
let heroPlayed = false;
// play hero animation when it's ready
heroAnimation.addEventListener("ready", () => {
  heroAnimation.style.opacity = 1;
  setTimeout(() => {
    heroAnimation.play();
    heroPlayed = true;
  }, 1200);
});
// scroll based animations
ScrollOut({
  onShown: function (element) {
    if (element.id == "hero-h1" && heroPlayed) {
      heroAnimation.play();
    } else if (element.id == "press-h1") {
      setTimeout(()=>pressAnimation.play(), 1000);
    } else if (element.id == "style-h1") {
      reelAnimation.style.opacity = 1;
      reelAnimation.play();
    } else if (element.id == "settings-h1") {
      settingsAnimation.play();
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
    } else if (element.id == "settings-h1") {
      settingsAnimation.pause();
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