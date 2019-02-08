let song;
let fft;
let spectrum = [];
let waves = [];
let add = 0; // add to bottom
let bin = 256;
let multi; // x axis gap
let band; // number of spectrum index to draw
let gap; // y axis gap


function setup() {
  createCanvas(1920, 1080);
  frameRate (25);
  background(40);
  gap = 7;
  band = 61;
  multi = width / 60;
  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.8, bin);
  amp = new p5.Amplitude()

  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
    song.play();
  button.html('pause');
}

function draw() {
  fft.setInput(song);
  level = amp.getLevel();
  spectrum = fft.analyze();
  waves.push(spectrum);

  bgcol = map(level, 0.1, 0.3, 100, 150);
  background(bgcol, 80);

  noStroke();
  fill(0, 12);


  for (n = 0; n < waves.length; n = n + 3) {
    if (n % 3 == 0) {

      // BOTTOM LEFT
      beginShape();
      curveVertex(0, height);
      curveVertex(0, height);
      for (i = 0; i < band; i++) {
        x = i * multi;
        y = ((height) + (n * -gap) - ((waves[n])[i]));
        curveVertex(x, y);
      }
      curveVertex(width, height);
      curveVertex(width, height);
      endShape();

      //TOP RIGHT
      beginShape();
      curveVertex(width, 0);
      curveVertex(width, 0);
      for (i = 0; i < band; i++) {
        x = width - (i * multi);
        y = (n * gap) + ((waves[n])[i]);
        curveVertex(x, y);
      }
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();

    }
  }

  if (waves.length > 60) {
    waves.splice(0, 1);
  }

}

function jumpSong() {
  song.jump(25.6);
  button.html('pause');
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.jump(1);
    button.html('pause');
  } else {
    song.pause();
    button.html('play');
  }
}

function refreshed() {
  song.jump(1);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song.isPlaying()) {
      song.jump(1);
      button.html('pause');
    } else {
      song.pause();
      button.html('play');
    }
  }
}
