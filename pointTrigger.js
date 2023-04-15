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

const xminElement = document.getElementById("xmin");
const xmaxElement = document.getElementById("xmax");
const yminElement = document.getElementById("ymin");
const ymaxElement = document.getElementById("ymax");

xminElement.onchange = () => updateCornerCoordinates();
xmaxElement.onchange = () => updateCornerCoordinates();
yminElement.onchange = () => updateCornerCoordinates();
ymaxElement.onchange = () => updateCornerCoordinates();

const aCornerElement = document.getElementById("a-corner");
const bCornerElement = document.getElementById("b-corner");
const cCornerElement = document.getElementById("c-corner");
const dCornerElement = document.getElementById("d-corner");

xminElement.value = 0;
xmaxElement.value = 500;
yminElement.value = 0;
ymaxElement.value = 500;

console.log("NOW",
  xminElement.value,
  xmaxElement.value,
  yminElement.value,
  ymaxElement.value
)

// Points registry
let points = []

// Points on the canvas
const POINT_COLOUR = "#0D6EFD";
const POINT_SIZE = 2;

/**
 * Draw a pixel on the canvas by given coordinates.
 *
 * @param x coordinate on the `x` axis. The higher the value, the
 *          more on right side of the canvas the point is gonna be.
 *
 * @param y coordinate on the `y` axis. The higher the value,
 *          the higher on the canvas the point is gonna be.
 *
 * @param recalc if the x and y coordinates should be recalculated to fit
 *               in the canvas.
 */
const drawPixel = (x, y, recalc = true) => {

  if (recalc) {
    const rect = canvasElement.getBoundingClientRect();
    x = Math.round(x - rect.left);
    y = Math.round(y - rect.top);
  }

  canvasContext.beginPath();
  canvasContext.fillStyle = POINT_COLOUR
  canvasContext.arc(x, y, POINT_SIZE, 0, 2 * Math.PI);
  canvasContext.stroke();
  canvasContext.fill();

  return {x, y}
}

const addPoint = (x, y) => {
  const point = [x, canvasHeight - y]
  points.push(point);
  console.log(point)
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
  const {x, y} = drawPixel(event.x, event.y)
  addPoint(x, y)
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
  tearDownCanvas();
  updateCounter();
}

const tearDownCanvas = () => {
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
}

const redrawCanvas = () => {
  tearDownCanvas();
  console.log("Redrawing!", points)
  points.forEach(point => drawPixel(point[0], canvasHeight - point[1], false))
}

const updateCornerCoordinates = () => {
  xmin = xminElement.value;
  xmax = xmaxElement.value;
  ymin = yminElement.value;
  ymax = ymaxElement.value;

  console.log("AFT", xmin, xmax, ymin, ymax)

  if (xmin < xmax && ymin < ymax) {
    aCornerElement.innerHTML = `<small><samp>[${xmin},${ymax}]</samp></small>`;
    bCornerElement.innerHTML = `<small><samp>[${xmax},${ymax}]</samp></small>`;
    cCornerElement.innerHTML = `<small><samp>[${xmin},${ymin}]</samp></small>`;
    dCornerElement.innerHTML = `<small><samp>[${xmax},${ymin}]</samp></small>`;
  } else if (xmin < xmax) {
    yminElement.value = ymaxElement.value - 1;
  } else {
    xminElement.value = xmaxElement.value - 1;
  }
}

updateCornerCoordinates();