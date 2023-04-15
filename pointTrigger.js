/**
 * This script is responsible for setting up the working environment
 * for the clicking in the datapoints into a canvas. These are also
 * downloadable in the CSV (Comma Separated Values) format.
 */

// Canvas preparation
const canvasElement = document.getElementById("canvas");
const canvasHeight = canvasElement.height;
const canvasWidth = canvasElement.width;
const canvasContext = canvasElement.getContext("2d");

// Controls preparation
const counterElement = document.getElementById("counter");
const filenameElement = document.getElementById("filename");
const downloadButton = document.getElementById("download-btn");
const flushButton = document.getElementById("flush-btn");
downloadButton.onclick = () => download();
flushButton.onclick = () => flushPoints();

// Points registry
let points = []

/**
 * Draw a pixel on the canvas by given coordinates.
 *
 * @param x coordinate on the `x` axis. The higher the value, the
 *          more on right side of the canvas the point is gonna be.
 *
 * @param y coordinate on the `y` axis. The higher the value,
 *          the higher on the canvas the point is gonna be.
 */
const drawPixel = (x, y) => {
  const rect = canvasElement.getBoundingClientRect();
  const X = Math.round(x - rect.left);
  const Y = Math.round(y - rect.top);

  canvasContext.beginPath();
  canvasContext.fillStyle = "#0D6EFD"
  canvasContext.arc(X, Y, 2, 0, 2 * Math.PI);
  canvasContext.stroke();
  canvasContext.fill();

  points.push([X, canvasHeight - Y]);
  updateCounter();
}

/**
 * Updates the counter by number of instances.
 *
 * Should be triggered everytime the number of instances
 * drawn on the canvas changes.
 */
const updateCounter = () => {
  counterElement.innerHTML = `Number of instances: ${points.length}`;
}

canvasElement.addEventListener("click", (event) => {
  drawPixel(event.x, event.y)
})


/**
 * Triggers the csv file download.
 *
 * This function prepares the header of the csv file and
 * for each of the points (instances) on the canvas, it
 * formats the data points. The result is downloaded as
 * a file with specified name given in the text input
 * field with ".csv" extension.
 */
const download = () => {
  let content = "x,y\n"

  // Create the .csv file
  points
    .map(point => `${point[0]},${point[1]}\n`)
    .forEach(record => content += record);

  const file = new Blob([content], {type: "text/plain"});

  // Create virtual link (anchor) element
  const a = document.createElement("a");
  a.target = "_BLANK"
  a.href = URL.createObjectURL(file);
  a.download = `${filenameElement.value}.csv`;
  a.click();

  // Clean it up
  a.remove();
}

/**
 * Clears up the canvas.
 *
 * By calling this function, all of the instances drawn on the
 * canvas are removed and the registry of data points is emptied.
 */
const flushPoints = () => {
  points = [];
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
  updateCounter();
}