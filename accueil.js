const overlay = document.querySelector(".overlay");

document.addEventListener("mousemove", (e) => {
  const mouseY = e.clientY / window.innerHeight;

  overlay.style.opacity = 1 - mouseY;
});
