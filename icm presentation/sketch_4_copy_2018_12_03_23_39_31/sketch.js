let song;
let fft;
let spectrum = [];
let x1;
let y1;
let waves = [];
let bgcol;


function setup() {
  createCanvas(1920, 1080);
  frameRate(40);

  song = loadSound("prayer_2.mp3", loaded);
  fft = new p5.FFT(0.5, 512);
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
  noFill();

  bgcol = map(level, 0, 0.3, 0, 255);

  if (bgcol > 150) {
    stroke(255, 70);
  } else {
    noStroke();
  }

  if (waves.length % 3 == 0) {
    background(bgcol, 0, 0, 10);
    // stroke(bgcol);
    // line (width/2,0,width/2,height);
    // noStroke();

    for (n = 0; n < waves.length; n = n + 3) {
      fill(255, 8);
      beginShape();
      for (let i = 2; i <= 30; i++) {
        if (i % 2 == 0) {
          x1 = (width / 2) + (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }

      for (let i = 30; i >= 0; i--) {
        if (i % 2 == 0) {

          x1 = (width / 2) - (((waves[n])[i]) - 200);
          y1 = (i * height / 16) - (width / 2.5);
          curveVertex(x1, y1);
        }
      }
      endShape();
    }
  }
  if (waves.length > 3) {
    waves.splice(0, 3);
  }

  if (song.currentTime() > 34.65 || song.currentTime() < 1) {
    background(0);
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
