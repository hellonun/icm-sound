let x1, y1, x2, y2, x3, y3, x4, y4;
let song1, song2;
let level1, level2;
let fft1, fft2;
let aveamp0;
let aveamp1, aveamp2;
let bin = 16;
let mul;
let spectrum1 = [];
let waves1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let waves2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let linemin;
let linemax;
let sizes = [1, 2];
let z;
let transLevel = 25;

function setup() {
  frameRate(20);
  createCanvas(1920, 1080);
  background(20);

  song1 = loadSound("opening_2left.mp3", loaded);
  song2 = loadSound("opening_2right.mp3", loaded);
  fft1 = new p5.FFT(0.9, bin);
  fft2 = new p5.FFT(0.9, bin);
  aveamp1 = new p5.Amplitude()
  aveamp2 = new p5.Amplitude()
  val0 = 10

  linemin = height / 2 + 200;
  linemax = height / 2 + 370;
  z = height / 2;
  mul = height / 50;

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
  background(30, 38, 51);
  noFill();
  strokeWeight(2);
  stroke(50);

  // top left line
  aveamp1.setInput(song1, 0);
  level1 = aveamp1.getLevel();
  val1 = map(level1, 0, 0.07, 0, transLevel);
  stroke(255, val1);

  fft1.setInput(song1);
  spectrum1 = fft1.analyze();
  waves1.push(spectrum1);

  for (n1 = 0; n1 < 20; n1++) {
    beginShape();
    for (var i1 = 0; i1 < 20; i1++) {
      var amp1 = (waves1[n1])[i1];
      curveVertex(x1, y1);
      x1 = map(amp1, 0, 255, linemin, linemax);
      y1 = width / 12 + i1 * mul
    }
    endShape();

    beginShape();
    for (var i3 = 0; i3 < 20; i3++) {
      var amp3 = (waves1[n1])[i3];
      curveVertex(x3, y3);
      x3 = map(amp3, 0, 255, linemin, linemax);
      y3 = height - width / 12 - (i3 * mul);
    }
    endShape();
  }
  waves1.splice(0, 1);

  // top right line
  aveamp2.setInput(song2, 0);
  level2 = aveamp2.getLevel();
  val2 = map(level2, 0, 0.07, 0, transLevel);
  stroke(255, val2);

  fft2.setInput(song2);
  var spectrum2 = fft2.analyze();
  waves2.push(spectrum2);

  for (n2 = 0; n2 < 20; n2++) {
    beginShape();
    for (var i2 = 0; i2 < 20; i2++) {
      var amp2 = (waves2[n2])[i2];
      curveVertex(x2, y2);
      x2 = map(amp2, 0, 255, width - linemin, width - linemax);
      y2 = width / 12 + (i2 * mul)
    }
    endShape();

    beginShape();
    for (var i4 = 0; i4 < 20; i4++) {
      var amp4 = (waves2[n2])[i4];
      curveVertex(x4, y4);
      x4 = map(amp4, 0, 255, width - linemin, width - linemax);
      y4 = height - width / 12 - (i4 * mul);
    }
    endShape();
  }
  waves2.splice(0, 1);
  val0 = (level1 - level2);
  size = map(val0, -0.01, 0.02, 80, 100);
  sizes.push(size);
  x = lerp(sizes[0], sizes[1], 0.001);
  stroke(x);
  //ellipse (width/2, height/2,  z +random(-5,5),  z +random(-5,5));
  sizes.splice(0, 1);
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
