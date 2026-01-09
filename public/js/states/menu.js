import { engine, STATES } from "../core/init.js";
import { drawButton, drawCheckbox, drawDial } from "../utils/draw.js";
import { input } from "../utils/input.js";

let menuState = {
  currentMenu: /** @type {'main' | 'play' | 'settings' | 'highscores'} */ (
    "main"
  ), // main, play, settings, highscores
  selectedIndex: 0,
};

const menus = {
  main: [
    {
      label: "Play",
      type: "button",
      action: () => {
        menuState.currentMenu = "play";
        menuState.selectedIndex = 0;
      },
    },
    {
      label: "Settings",
      type: "button",
      action: () => {
        menuState.currentMenu = "settings";
        menuState.selectedIndex = 0;
      },
    },
    {
      label: "Highscores",
      type: "button",
      action: () => {
        menuState.currentMenu = "highscores";
        menuState.selectedIndex = 0;
      },
    },
  ],

  play: [
    {
      label: "Easy",
      type: "button",
      action: () => {
        engine.difficulty = "easy";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Medium",
      type: "button",
      action: () => {
        engine.difficulty = "medium";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Hard",
      type: "button",
      action: () => {
        engine.difficulty = "hard";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Insane",
      type: "button",
      action: () => {
        engine.difficulty = "insane";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Back",
      type: "button",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 0;
      },
    },
  ],

  settings: [
    // Design this properly later
    { label: "Music", type: "dial" },
    { label: "Music muted", type: "checkbox" },
    { label: "Sound", type: "dial" },
    { label: "Sound muted", type: "checkbox" },
    { label: "Gridlines On/Off", type: "checkbox" },
    { label: "Snake Color", type: "dial" },
    { label: "Warp Walls (-30% score)", type: "checkbox" },
    { label: "Show FPS", type: "checkbox" },
    {
      label: "Back",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 1;
      },
    },
  ],

  highscores: [
    {
      label: "Back",
      type: "button",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 2;
      },
    },
  ],
};

export const updateMenu = () => {
  const currentItems = menus[menuState.currentMenu];
  const maxIndex = currentItems.length - 1;

  // Navigate Up
  if (input.isDown("ArrowUp")) {
    menuState.selectedIndex--;
    if (menuState.selectedIndex < 0) menuState.selectedIndex = maxIndex;
    input.keys.delete("ArrowUp");
  }

  // Navigate Down
  if (input.isDown("ArrowDown")) {
    menuState.selectedIndex++;
    if (menuState.selectedIndex > maxIndex) menuState.selectedIndex = 0;
    input.keys.delete("ArrowDown");
  }

  // Select / Execute
  if (input.isDown("Enter") || input.isDown(" ")) {
    const selectedItem = currentItems[menuState.selectedIndex];
    if (selectedItem && selectedItem.action) {
      selectedItem.action();
    }
    input.keys.delete("Enter");
    input.keys.delete(" ");
  }
};

export function renderMenu() {
  const ctx = engine.ctx;

  ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  const currentItems = menus[menuState.currentMenu];

  // Draw all items
  currentItems.forEach((item, i) => {
    const selected = i === menuState.selectedIndex;

    switch (item.type) {
      case "button":
        drawButton(item.label, engine.canvas.width / 2, 200 + i * 40, {
          selected,
        });
        break;
      case "checkbox":
        drawCheckbox(item.label, engine.canvas.width / 2, 200 + i * 40, {
          selected,
          checked: !!item.checked,
        });
        break;
      case "dial":
        drawDial(
          item.label,
          item.value ?? "N/A",
          engine.canvas.width / 2,
          200 + i * 40,
          2,
          { selected },
        );
        break;
      default:
        drawButton(item.label, engine.canvas.width / 2, 200 + i * 40, {
          selected,
        });
        break;
    }
  });
}
