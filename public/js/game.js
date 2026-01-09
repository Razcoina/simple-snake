import { engine } from "./core/init.js";
import stateManager from "./core/stateManager.js";

/**
 * @param {DOMHighResTimeStamp} timestamp
 */
function mainLoop(timestamp) {
  // First frame, setup only
  if (!engine.lastTime) {
    engine.lastTime = timestamp;

    // Focus on the canvas
    engine.canvas.focus();

    // Prevent fps counter from breaking
    requestAnimationFrame(mainLoop);
    return;
  }

  let frameTime = timestamp - engine.lastTime;
  engine.lastTime = timestamp;

  // Prevent "spiral of death" (tab inactive / frame stalls)
  frameTime = Math.min(frameTime, 250);

  engine.accumulator += frameTime;

  const instantFPS = 1000 / frameTime;
  engine.fps = engine.fps * 0.9 + instantFPS * 0.1;

  if (!engine.paused) {
    while (engine.accumulator >= engine.tickrate) {
      stateManager.update();

      engine.accumulator -= engine.tickrate;
    }
  }

  stateManager.render(timestamp);

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
