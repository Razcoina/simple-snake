import { engine } from "../core/init.js";

export const updateGame = () => {
  // e.g., move snake, check collisions
};

export const renderGame = () => {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  // draw snake as a single green square for now
};
