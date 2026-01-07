import { config } from "./config.js";

console.log(config.canvas); // the canvas
console.log(config.ctx); // 2D context
console.log(config.snakeColor); // "green"

// Use destructuring if you want short names
const { canvas, ctx, TILE_SIZE } = config;

ctx.fillStyle = config.snakeColor;
ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
