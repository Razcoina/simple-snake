import { engine, settings, STATES } from "../core/init.js";
import { updateMenu, renderMenu } from "../states/menu.js";
import { updateGame, renderGame } from "../states/game.js";
import { updateScore, renderScore } from "../states/score.js";

let lastFPSUpdate = 0;
let displayedFPS = "0";

const updateMap = {
  [STATES.MENU]: updateMenu,
  [STATES.GAME]: updateGame,
  [STATES.SCORE]: updateScore,
};

const renderMap = {
  [STATES.MENU]: renderMenu,
  [STATES.GAME]: renderGame,
  [STATES.SCORE]: renderScore,
};

const stateManager = {
  update: () => updateMap[engine.gameState](),

  /**
   * @param {DOMHighResTimeStamp} timestamp
   * */
  render: (timestamp) => {
    renderMap[engine.gameState]();

    stateManager.showFPS(timestamp);
  },

  /**
   * @param {DOMHighResTimeStamp} timestamp
   * */
  showFPS: (timestamp) => {
    if (!settings.showFPS) {
      return;
    }

    const interval = 500;

    if (timestamp - lastFPSUpdate >= interval) {
      displayedFPS = engine.fps.toFixed(1);
      lastFPSUpdate = timestamp;
    }

    engine.ctx.save();
    engine.ctx.font = "16px VT323, monospace";
    engine.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    engine.ctx.textAlign = "left";
    engine.ctx.textBaseline = "top";
    engine.ctx.fillText(`FPS: ${displayedFPS}`, 8, 8);
    engine.ctx.restore();
  },
};

export default stateManager;
