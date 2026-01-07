import { STATES, engine, settings } from "./init.js";

console.log(engine.canvas); // the canvas
console.log(engine.ctx); // 2D context
console.log(settings.snakeColor); // "green"

engine.ctx.fillStyle = settings.snakeColor;
engine.ctx.fillRect(0, 0, engine.TILE_SIZE, engine.TILE_SIZE);
