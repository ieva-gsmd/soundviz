let player;
let fft;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay); // Toggle play on canvas click

  // Create a new player and connect it to the destination (speakers)
  player = new Tone.Player("./andrea.mp3").toDestination();
  
  // Create an FFT analyser with 1024 frequency bins
  fft = new Tone.Analyser('fft', 1024);
  
  // Connect the player to the FFT analyser
  player.connect(fft);
}

function draw() {
  background(0);

  // Get the FFT values (frequency domain data) in decibels
  let spectrum = fft.getValue();

  // Visualizer in a straight line
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    fill(i, 0, 200);
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], -100, 0, height, 0); // Adjust from decibels to pixels
    rect(x, height, width / spectrum.length, h); //draw rectangles
  }

  // Display play/pause instruction
  textSize(28);
  if (player.state === 'started') {
    text('click to Pause', mouseX, mouseY);
    fill(0, 102, 153);
  } else {
    text('click to Play', mouseX, mouseY);
    fill(0, 102, 153);
  }
}

// Function to toggle play/pause
function togglePlay() {
  if (player.state === 'started') {
    player.stop(); // Stop playback
  } else {
    player.start(); // Start playback
    Tone.start();   // Ensure the audio context is started (required for Tone.js)
  }
}
