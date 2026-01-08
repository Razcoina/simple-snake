import { engine } from "../core/init.js";

export const updateGame = () => {
  // e.g., move snake, check collisions
};

export const renderGame = () => {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
  engine.ctx.fillStyle = "#fff";
  engine.ctx.font = "24px VT323, monospace";
  engine.ctx.fillText("Playing - Enjoy!!!", 50, 50);
};
