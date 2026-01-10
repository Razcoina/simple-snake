/**
 * @typedef {Object} TableColumn
 * @property {string} key
 * @property {string} label
 * @property {number} width
 * @property {"left"|"right"|"center"} [align]
 * */

/**
 * @typedef {Object<string, any>} TableRow
 * Row values keyed by column keys
 * */

import { engine } from "../core/init.js";

const defaultColor = "#9aa5a0";
const defaultSelectedColor = "#14eb6a";

/**
 * Formats a value as a fixed-width table cell.
 *
 * Converts the given value to a string and pads it with spaces so that
 * it fits exactly within the specified width. Padding behavior depends
 * on the chosen alignment.
 *
 * @param {string|number} text - Value to render inside the cell
 * @param {number} width - Fixed width of the cell (in characters)
 * @param {"left"|"center"|"right"} align - Text alignment inside the cell
 *
 * @returns {string} A string padded with spaces to exactly match `width`
 * */
function formatCell(text, width, align) {
  const str = String(text);

  if (align === "right") {
    return str.padStart(width, " ");
  }

  if (align === "center") {
    const totalPadding = width - str.length;
    const left = Math.floor(totalPadding / 2);
    const right = totalPadding - left;
    return " ".repeat(left) + str + " ".repeat(right);
  }

  // Left align (default)
  return str.padEnd(width, " ");
}

/**
 * Draws text on a canvas with optional styling.
 *
 * @param {string} text - Text to draw
 * @param {number} x - X position in canvas space
 * @param {number} y - Y position in canvas space
 * @param {Object} [options]
 * @param {string} [options.color=defaultColor] - Text color
 * @param {number} [options.size=24] - Font size in pixels
 * @param {"left"|"center"|"right"} [options.align="center"] - Text alignment
 * */
export function drawText(
  text,
  x,
  y,
  { color = defaultColor, size = 24, align = "center" } = {},
) {
  engine.ctx.save();
  engine.ctx.font = `${size}px VT323, monospace`;
  engine.ctx.fillStyle = color;
  engine.ctx.textAlign = align;
  engine.ctx.textBaseline = "middle";
  engine.ctx.fillText(text, x, y);
  engine.ctx.restore();
}

/**
 * Draws a text only button on a canvas.
 *
 * @param {string} text - Text to draw
 * @param {number} x - X position in canvas space
 * @param {number} y - Y position in canvas space
 * @param {Object} [options]
 * @param {boolean} [options.selected=false] - Whether the button is selected
 * @param {number} [options.size=28] - Font size in pixels
 * */
export function drawButton(text, x, y, { selected = false, size = 28 } = {}) {
  drawText(text, x, y, {
    color: selected ? defaultSelectedColor : defaultColor,
    size: size,
  });
}

/**
 * Draws a checkbox with a label on a canvas.
 *
 * @param {string} label - Label to draw
 * @param {number} x - X position in canvas space
 * @param {number} y - Y position in canvas space
 * @param {Object} [options]
 * @param {boolean} [options.selected=false] - Whether the button is selected
 * @param {boolean} [options.checked=false] - Whether the checkbox is checked
 * @param {number} [options.size=28] - Font size in pixels
 * */
export function drawCheckbox(
  label,
  x,
  y,
  { selected = false, checked = false, size = 28 } = {},
) {
  const box = checked ? "[X]" : "[ ]";
  drawText(`${label} ${box}`, x, y, {
    color: selected ? defaultSelectedColor : defaultColor,
    size: size,
  });
}

/**
 * Draws a dial with a label on a canvas.
 *
 * @param {string} label - Label to draw
 * @param {string} value - Value currently selected
 * @param {number} x - X position in canvas space
 * @param {number} y - Y position in canvas space
 * @param {number} space - Number of spaces between the values and the arrows
 * @param {Object} [options]
 * @param {boolean} [options.selected=false] - Whether the button is selected
 * @param {number} [options.size=28] - Font size in pixels
 * */
export function drawDial(
  label,
  value,
  x,
  y,
  space,
  { selected = false, size = 28 } = {},
) {
  const padding = " ".repeat(space);

  const text = `${label}: <${padding}${value}${padding}>`;

  drawText(text, x, y, {
    color: selected ? defaultSelectedColor : defaultColor,
    size: size,
  });
}

/**
 * Draws an input field with a label on a canvas.
 *
 * @param {string} label - Label to draw
 * @param {string} value - Value currently selected
 * @param {number} x - X position in canvas space
 * @param {number} y - Y position in canvas space
 * @param {Object} [options]
 * @param {boolean} [options.selected=false] - Whether the button is selected
 * @param {number} [options.maxLength=12] - Maximum number of characters allowed
 * @param {number} [options.size=28] - Font size in pixels
 * */
export function drawInputField(
  label,
  value,
  x,
  y,
  { selected = false, maxLength = 12, size = 28 } = {},
) {
  const cursor =
    selected && Math.floor(performance.now() / 500) % 2 === 0 ? "_" : " ";

  const paddedValue = value.padEnd(maxLength, " ") + 1;
  const text = `${label}: [ ${paddedValue}${cursor} ]`;

  drawText(text, x, y, {
    color: selected ? defaultSelectedColor : defaultColor,
    size: size,
  });
}

/**
 * Draws a text table on the canvas.
 *
 * @param {TableRow[]} rows
 * @param {TableColumn[]} columns
 * @param {number} x
 * @param {number} y
 * @param {Object} [options]
 * @param {number} [options.rowHeight=32]
 * @param {number} [options.size=24]
 * */
export function drawTable(
  rows,
  columns,
  x,
  y,
  { rowHeight = 32, size = 24 } = {},
) {
  // Header
  const header = columns
    .map((col) => formatCell(col.label, col.width, col.align ?? "left"))
    .join(" ");

  drawText(header, x, y, { size, align: "left" });

  // Separator
  const separator = columns.map((col) => "-".repeat(col.width)).join(" ");
  drawText(separator, x, y + rowHeight, { size, align: "left" });

  // Rows
  rows.forEach((row, index) => {
    const line = columns
      .map((col) => formatCell(row[col.key], col.width, col.align ?? "left"))
      .join(" ");

    drawText(line, x, y + rowHeight * (index + 2), { size, align: "left" });
  });
}

/**
 * Draw gridlines on the canvas.
 * */
export function drawGrid() {
  engine.ctx.strokeStyle = "#222";
  engine.ctx.lineWidth = 1;

  // Vertical lines
  for (let x = 0; x <= engine.canvas.width; x += engine.TILE_SIZE) {
    engine.ctx.beginPath();
    engine.ctx.moveTo(x, 0);
    engine.ctx.lineTo(x, engine.canvas.height);
    engine.ctx.stroke();
  }

  // Horizontal lines
  for (let y = 0; y <= engine.canvas.height; y += engine.TILE_SIZE) {
    engine.ctx.beginPath();
    engine.ctx.moveTo(0, y);
    engine.ctx.lineTo(engine.canvas.width, y);
    engine.ctx.stroke();
  }
}
