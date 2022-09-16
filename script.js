
let img;
function preload() {
  img = loadImage('./glu.png');
}


const chars = ".+xXW";
const size = 100;
let xpos = 0;
function setup() {
  createCanvas(100, 100);
  //noCanvas();
  capture = createCapture(VIDEO);
  //capture.hide();
  capture.size(size, (size * capture.height) / capture.width);
  frameRate(10)
}

function draw() {
  image(img, xpos % size, 0, size, size);
  xpos++;
  //const frame = capture.get();
  if (xpos == 20) { console.log("100") }
  if (xpos > 20) {
    let mycanvas = document.getElementById("defaultCanvas0");
    document.getElementById("target").src = mycanvas.toDataURL();
    imgF = loadImage(mycanvas.toDataURL());
    const frame = imgF.get();
    image(img, xpos % size, 10, size*2, size*2);
    //
    // let imgF = new Image();
    /*
    //document.getElementById("target").src = mycanvas.toDataURL();
    
    //const frame = document.getElementById("target").get();
    // frame.filter(BLUR, 1);
    */
    frame.loadPixels();
    let grid = [];
    colorMode(RGB, 255);

    let minLightness = 255;
    let maxLightness = 0;

    for (let y = 0; y < frame.height; y++) {
      const gridRow = [];
      grid.push(gridRow);
      for (let x = 0; x < frame.width; x++) {
        const index = 4 * (y * frame.width + x);
        const [r, g, b] = frame.pixels.slice(index, index + 4);
        const c = color(r, g, b);
        const col = [hue(c), saturation(c), lightness(c)];

        gridRow.push(col);

        minLightness = Math.min(minLightness, col[2]);
        maxLightness = Math.max(maxLightness, col[2]);
      }
    }

    grid = grid.map((row) => {
      row = row.map((c) => {
        c[2] = map(c[2], minLightness, maxLightness, 0, 255);
        return c;
      });
      return row;
    });

    let str = "aaaaaaaa";
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const c = grid[y][x];

        const char =
          chars[Math.floor(map(c[2], 0, 255, 0, chars.length - 0.1))] || " ";
        str += char;
      }
      str += "\n";
    }
    console.log(str);
    document.getElementById("ascii").innerText = str;

  }
  // noLoop();

}