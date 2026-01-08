import { engine } from "../core/init.js";

export const updateScore = () => {
  // update score logic if needed
};

export const renderScore = () => {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
  engine.ctx.fillStyle = "#fff";
  engine.ctx.font = "20px monospace";
  engine.ctx.fillText(`Score: ${engine.score}`, 50, 50);
};
