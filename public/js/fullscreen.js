document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const fullscreenBtn = document.querySelector(".fullscreen-btn");
  if (!canvas || !fullscreenBtn) return;

  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch((err) => {
        console.error("Fullscreen failed:", err);
      });
    } else {
      document.exitFullscreen();
    }

    canvas.focus();
  });
});
