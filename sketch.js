let song;
let fft;


//function to allow playing audio
function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

//load the audio before anything else
function preload() {
  song = loadSound('Andrea - TrackQY.mp3');
}

function setup() {

  let cnv = createCanvas(windowWidth, windowHeight);
  // listen for the canvas being clicked
  cnv.mouseClicked(togglePlay);

  // set angle mode to degrees - for the circular viz
  angleMode(DEGREES);

  // reference to FFT: https://p5js.org/reference/#/p5.FFT
  fft = new p5.FFT(0.9, 256);
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  //console.log(spectrum);

  // //visualiser in a straight line:
  noStroke();
  for (let i = 0; i < spectrum.length; i++){
    fill(i, 0, 200);
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  // //uncomment below for a circular visualiser
  // noStroke();
  // //put the visualiser in the middle
  // translate(width / 2, height / 2);

  // for (let i = 0; i < spectrum.length; i++) {
  //   let angle = map(i, 0, spectrum.length, 0, 360);
  //   let amp = spectrum[i];
  //   let r = map(amp, 0, 256, 0, 150);

  //   let x = r * cos(angle);
  //   let y = r * sin(angle);
  //   stroke(i, 255, 255);
  //   line(0, 0, x, y);
 
  // }

  //show UX text depending whether track is playing or not
  if (song.isPlaying()) {
    textSize(28);
    text('click to Pause', mouseX, mouseY);
    fill(0, 102, 153);
  } else {
    textSize(28);
    text('click to Play', mouseX, mouseY);
    fill(0, 102, 153);
  }

}
