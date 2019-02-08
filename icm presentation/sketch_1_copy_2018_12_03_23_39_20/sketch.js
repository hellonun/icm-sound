let add = 0;
let bin = 16;
let minbin = 6;
let maxbin = 9;
let song1, song2, fft1, fft2, aveamp1, aveamp2, len1, len2;
let spectrum1 = [];
let spectrum2 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let diff;


function setup() {
  frameRate(20);
  createCanvas(1920, 1080);
  background(10);

  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()

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
  background(50);

  //LEFT ELLIPSE
  aveamp1.setInput(song1, 0.9);
  level1 = aveamp1.getLevel();


  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  // loop through wave araay index
  for (n1 = 0; n1 < waves1.length; n1++) {

    // loop through each point in wave array index
    for (var i1 = minbin; i1 < maxbin; i1++) {
      var amp1 = (waves1[n1])[i1];

      // draw bin minbin to max bin
      if (i1 > minbin && i1 < maxbin) {
        x1 = map(amp1, 0, 255, 0, height * 3);
        y1 = 200;
        colcol = map(x1, 0, 1200, 0, 255);

        noStroke();
        fill(0, 5);
        ellipse((width / 2) - add, height / 2, x1 + random(-5, 5), x1 + random(-5, 5))
      }
    }
  }
  waves1.splice(0, 1);

  //RIGHT ELLIPSE
  aveamp2.setInput(song2, 0.9);
  level2 = aveamp2.getLevel();

  fft2.setInput(song2);
  spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  // loop through wave araay index
  for (n2 = 0; n2 < waves2.length; n2++) {

    // loop through each point in wave array index
    for (var i2 = minbin; i2 < maxbin; i2++) {
      var amp2 = (waves2[n2])[i2];

      // draw bin minbin to max bin
      if (i2 > minbin && i2 < maxbin) {
        x2 = map(amp2, 0, 255, 0, height * 3);
        y2 = 200;
        colcol = map(x2, 0, 1200, 0, 255);

        noStroke();
        fill(0, 5);
        ellipse((width / 2) + add, height / 2, x2 + random(-5, 5), x2 + random(-5, 5))
      }
    }
  }
  waves2.splice(0, 1);

  diff = level1 - level2;
  add = map(diff, -0.07, 0.08, 50, 100);
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
