import { engine } from "../core/init.js";

export const updateMenu = () => {
  // e.g., handle menu navigation
};

export const renderMenu = () => {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
  engine.ctx.fillStyle = "#fff";
  engine.ctx.font = "20px monospace";
  engine.ctx.fillText("Menu - Press Start", 50, 50);
};
