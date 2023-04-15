const canvasElement = document.getElementById("canvas");
const canvasHeight = canvasElement.height;
const canvasWidth = canvasElement.width;
const canvasContext = canvasElement.getContext("2d");

const counterElement = document.getElementById("counter");
const filenameElement = document.getElementById("filename")

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

const updateCounter = () => {
  counterElement.innerHTML = `Number of instances: ${points.length}`;
}

canvasElement.addEventListener("click", (event) => {
  drawPixel(event.x, event.y)
})

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

const flushPoints = () => {
  points = [];
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
  updateCounter();
}