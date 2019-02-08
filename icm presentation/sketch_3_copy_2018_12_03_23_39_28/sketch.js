let waveL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let waveR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let y1 = 200;
let y2 = 200;
let y3 = 200;
let x1 = 200;
let x2 = 200;
let x3 = 200;

function setup() {
  frameRate(40);
  createCanvas(1920, 1080);
  background(15);
  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  button = createButton('play');
  button.mousePressed(togglePlaying);

  jumpButton = createButton('jump');
  jumpButton.mousePressed(jumpSong);

  refresh = createButton('refresh');
  refresh.mousePressed(refreshed);

}

function loaded() {
  song1.play();
  song2.play();
  button.html('pause');
}

function draw() {
  fft1.setInput(song1);
  fft1.analyze();
  fft2.setInput(song2);
  fft2.analyze();

  lMidVal1 = fft1.getEnergy("lowMid");
  waveL.push(lMidVal1); // store as array left

  midVal1 = fft1.getEnergy("mid");
  midVal2 = fft2.getEnergy("mid");
  midVal3 = midVal1 + midVal2;
  waveM.push(midVal3); // store as array middle

  lMidVal2 = fft2.getEnergy("lowMid");
  waveR.push(lMidVal2) // store as array right


  for (i = 0; i < 9; i++) {
    noStroke();
    fill(255, 2);

    e1 = map(waveL[i], 0, 200, -300, 600);
    e2 = map(waveM[i], 0, 200, -300, 600);
    e3 = map(waveR[i], 0, 200, -300, 600);

    if (e1 > -100) { // don't draw the first few circles
      ellipse(width / 4, y1, e1, e1);
      // ellipse(x1, y1, e1, e1);

      ellipse(width / 4 * 2, y2, e2, e2);
      // ellipse(x2, y2, e2, e2);

      ellipse(width / 4 * 3, y3, e3, e3);
      // ellipse(x3, y3, e3, e3);
    }
  }

  if (waveL[i] < 70) {
    y1 = random(height);
    // x1 = random(0, width / 4);
    fill(0);
  }

  if (waveM[i] < 70) {
    y2 = random(height);
    // x2 = random(width / 4, width / 4 * 2);
    fill(0);
  }

  if (waveR[i] < 70) {
    y3 = random(height);
    // x3 = random(width / 4 * 2, width);
    fill(0);
  }

  waveL.splice(0, 1);
  waveM.splice(0, 1);
  waveR.splice(0, 1);

  // if don't present sound
  if (song1.currentTime() > 30.9 || song1.currentTime() < 1) {
    background(15);
  }
}

function jumpSong() {
  song1.jump(20.185);
  song2.jump(20.185);
  button.html('pause');
}

function togglePlaying() {
  if (!song1.isPlaying()) {
    song1.play();
    song2.play();
    button.html('pause');
  } else {
    song1.pause();
    song2.pause();
    button.html('play');
  }
}

function refreshed() {
  song1.jump(0);
  song2.jump(0);
  background(15);
  button.html('pause');
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!song1.isPlaying()) {
      song1.play();
      song2.play();
      button.html('pause');
    } else {
      song1.pause();
      song2.pause();
      button.html('play');
    }
  }
}
