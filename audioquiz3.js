// Create a new instance of an audio object and adjust some of its properties

var audioCount = parseInt(sessionStorage.getItem('audioCount'))

var audio = new Audio();
audio.loop = true;
console.log(audioCount)
audio.src = `audio/2.mp3`;
console.log(audio.src)
var btn = document.getElementById("audio-btn");
var firstToggle = true


function togglePlay() {
  if (audio.paused && firstToggle == true) {
    audio.play()
    initMp3Player()
    btn.classList.toggle("pause")
    firstToggle = false
  } else if (audio.paused) {
    audio.play()
    btn.classList.toggle("pause")
  }
  else {
    audio.pause()
    btn.classList.toggle("pause")
  }
}

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
//btn.addEventListener("click", initMp3Player, false);

function initMp3Player() {
  console.log(audio)
  console.log('init')
  document.getElementById('audio_container').appendChild(audio);
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById('analyser-render');
  ctx = canvas.getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}

// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  console.log(analyser.getByteFrequencyData(fbc_array));
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = '#fff'; // Color of the bars
  bars = 60;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 5;
    bar_width = 3;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}