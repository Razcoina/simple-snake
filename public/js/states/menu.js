import { engine, settings, STATES, saveSettings } from "../core/init.js";
import { drawButton, drawCheckbox, drawDial, drawGrid } from "../utils/draw.js";
import { input } from "../utils/input.js";

let menuState = {
  currentMenu: /** @type {'main' | 'play' | 'settings' | 'highscores'} */ (
    "main"
  ),
  selectedIndex: 0,
};

/**
 * @typedef {{
 *   label: string
 *   type: "button"
 *   action: () => void
 * }} ButtonItem
 */

/**
 * @typedef {{
 *   label: string
 *   type: "checkbox"
 *   readonly value: boolean
 *   action: () => void
 * }} CheckboxItem
 */

/**
 * @typedef {{
 *   label: string
 *   type: "dial"
 *   readonly value: number | string
 *   action: (act?: "+" | "-") => void
 * }} DialItem
 */

/**
 * @typedef {ButtonItem | CheckboxItem | DialItem} MenuItem
 */

/** @type {Record<'main' | 'play' | 'settings' | 'highscores', MenuItem[]>} */
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
    {
      label: "Music",
      type: "dial",
      get value() {
        return settings.musicVolume;
      },
      action: (/** @type {"+" | "-" | undefined} */ act = undefined) => {
        let val = settings.musicVolume;

        switch (act) {
          case "-":
            val = val - 5;
            break;
          case "+":
            val = val + 5;
            break;
          default:
            break;
        }

        settings.musicVolume = Math.max(0, Math.min(100, val));

        saveSettings();
      },
    },
    {
      label: "Music muted",
      type: "checkbox",
      get value() {
        return settings.musicMute;
      },
      action: () => {
        settings.musicMute = !settings.musicMute;
        saveSettings();
      },
    },
    {
      label: "Sound",
      type: "dial",
      get value() {
        return settings.soundVolume;
      },
      action: (/** @type {"+" | "-" | undefined} */ act = undefined) => {
        let val = settings.soundVolume;

        switch (act) {
          case "-":
            val = val - 5;
            break;
          case "+":
            val = val + 5;
            break;
          default:
            break;
        }

        settings.soundVolume = Math.max(0, Math.min(100, val));

        saveSettings();
      },
    },
    {
      label: "Sound muted",
      type: "checkbox",
      get value() {
        return settings.soundMute;
      },
      action: () => {
        settings.soundMute = !settings.soundMute;
        saveSettings();
      },
    },
    {
      label: "Gridlines On/Off",
      type: "checkbox",
      get value() {
        return settings.gridLines;
      },
      action: () => {
        settings.gridLines = !settings.gridLines;
        saveSettings();
      },
    },
    {
      label: "Snake Color",
      type: "dial",
      get value() {
        return settings.snakeColor;
      },
      action: (/** @type {"+" | "-" | undefined} */ act = undefined) => {
        const options = ["green", "red", "blue", "yellow", "white"];
        let idx = options.indexOf(settings.snakeColor);

        switch (act) {
          case "-":
            idx--;
            break;
          case "+":
            idx++;
            break;
          default:
            break;
        }

        if (idx < 0) idx = options.length - 1;
        if (idx >= options.length) idx = 0;

        settings.snakeColor = options[idx];

        saveSettings();
      },
    },
    {
      label: "Warp Walls (-30% score)",
      type: "checkbox",
      get value() {
        return settings.warpWalls;
      },
      action: () => {
        settings.warpWalls = !settings.warpWalls;
        saveSettings();
      },
    },
    {
      label: "Show FPS",
      type: "checkbox",
      get value() {
        return settings.showFPS;
      },
      action: () => {
        settings.showFPS = !settings.showFPS;
        saveSettings();
      },
    },
    {
      label: "Back",
      type: "button",
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
  const selectedItem = currentItems[menuState.selectedIndex];

  // Loop through pressed keys
  for (const key of input.keys) {
    switch (key) {
      case "ArrowUp":
        menuState.selectedIndex--;
        if (menuState.selectedIndex < 0) menuState.selectedIndex = maxIndex;
        input.keys.delete("ArrowUp");
        break;

      case "ArrowDown":
        menuState.selectedIndex++;
        if (menuState.selectedIndex > maxIndex) menuState.selectedIndex = 0;
        input.keys.delete("ArrowDown");
        break;

      case "ArrowRight":
        if (selectedItem?.type === "dial" && selectedItem.action) {
          selectedItem.action("+");
        }
        input.keys.delete("ArrowRight");
        break;

      case "ArrowLeft":
        if (selectedItem?.type === "dial" && selectedItem.action) {
          selectedItem.action("-");
        }
        input.keys.delete("ArrowLeft");
        break;

      case "Enter":
      case " ":
        if (selectedItem?.type !== "dial" && selectedItem?.action) {
          selectedItem.action();
        }
        input.keys.delete("Enter");
        input.keys.delete(" ");
        break;
    }
  }
};

export function renderMenu() {
  const ctx = engine.ctx;

  ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  if (settings.gridLines) {
    drawGrid();
  }

  const currentItems = menus[menuState.currentMenu];

  const spacing = 40; // space between items
  const totalHeight = (currentItems.length - 1) * spacing; // total menu height
  const startY = engine.canvas.height / 2 - totalHeight / 2; // center vertically

  currentItems.forEach((item, i) => {
    const selected = i === menuState.selectedIndex;
    const x = engine.canvas.width / 2;
    const y = startY + i * spacing;

    switch (item.type) {
      case "button":
        drawButton(item.label, x, y, { selected });
        break;

      case "checkbox":
        drawCheckbox(item.label, x, y, {
          selected,
          checked: item.value,
        });
        break;

      case "dial":
        drawDial(item.label, item.value.toString(), x, y, 2, { selected });
        break;
    }
  });
}
