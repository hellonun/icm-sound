let spectrum;
let mic;
let song;
let fft;
let waves = [];
let px, py, sx, sy;
let mul;
let minband = 78;
let maxband = 150;

function setup() {
  createCanvas(1920, 1080);
  frameRate(20);

  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.9, 256);

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
  background(0);
  fft.setInput(song);
  spectrum = fft.analyze();
  waves.push(spectrum);


  // value for big circle lMidVal
  lMidVal = (fft.getEnergy("lowMid"));

  // value for little circle newVal
  midVal = (fft.getEnergy("mid"));
  trebVal = (fft.getEnergy("treble"));
  newVal = (midVal + trebVal) / 2;

  bgcol = map(midVal, 100, 200, 30, 100);
  background(123, 143, 173, bgcol);
  noStroke();

  fillMul1 = map(newVal, 0, 150, 80, 300);
  fillMul2 = map(newVal, 0, 150, 0.3, 1.5);
  fill(fillMul1, fillMul2);

  mul = map(newVal, 50, 150, 8, 13);

  for (n = 0; n < waves.length; n++) {
    for (i = minband; i < maxband; i++) {
      px = (width / 2);
      mul = width / (maxband - minband)
      // py = ((i - minband) * mul);
      py = ((i - minband) * mul);
      sx = ((waves[n])[i]) * 2;
      sy = ((waves[n])[i]) * 2;
      ellipse(px + (n * mul) / 1.8, py + (n * (mul / waves.length)), sx, sy);
      ellipse(px - (n * mul) / 1.8, py - (n - (mul / waves.length)), sx, sy);

    }
  }
  if (waves.length > 20) {
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
