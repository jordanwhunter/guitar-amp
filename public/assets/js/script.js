const volume = document.getElementById('volume');
const treble = document.getElementById('treble');
const mid = document.getElementById('mid');
const bass = document.getElementById('bass');
const visualizer = document.getElementById('visualizer');
  
const context = new AudioContext();
const analyserNode = new AnalyserNode(context, { fftSize: 128 });
const gainNode = new GainNode(context, { gain: volume.value });
const trebleEQ = new BiquadFilterNode(context, {
  type: 'highshelf',
  frequency: 3000,
  gain: treble.value
});
const midEQ = new BiquadFilterNode(context, {
  type: 'peaking',
  Q: Math.SQRT1_2,
  frequency: 1500,
  gain: mid.value
});


const getGuitar = () => {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  })
};

const setupContext = async () => {
  const guitar = await getGuitar();

  if (context.state === 'suspended') {
    await context.resume()
  };

  const source = context.createMediaStreamSource(guitar)
  source
    .connect(trebleEQ)
    .connect(midEQ)
    .connect(gainNode)
    .connect(analyserNode)
    .connect(context.destination)
};

const drawVisualizer = () => {
  requestAnimationFrame(drawVisualizer)

  // Number for how many different frequencies 
  const bufferLength = analyserNode.frequencyBinCount;
  // How many different freqs. are being returned from analyserNode
  const dataArray = new Uint8Array(bufferLength);
  // array is populated with value that corresponds with level of a particular frequency
  analyserNode.getByteFrequencyData(dataArray);

  const width = visualizer.width;
  const height = visualizer.height;
  const barWidth = width / bufferLength

  const canvasContext = visualizer.getContext('2d');
  canvasContext.clearRect(0, 0, width, height);

  dataArray.forEach((item, index) => {
    // 255 is max number for frequency
    const y = item / 255 * height / 2;
    // width of each individual bar multiplied by current index 
    const x = barWidth * index;
    // staying within hue of 200 to keep blue colors 
    // '* 400' to compensate for the  '/ 2' on line 53
    canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`
    // to draw - starting at x position || y position is height - y
    canvasContext.fillRect(x, height - y, barWidth, y)
  })
};

const resize = () => {
  visualizer.width = visualizer.clientWidth * window.devicePixelRatio
  visualizer.height = visualizer.clientHeight * window.devicePixelRatio
};

const setupEventListeners = () => {
  window.addEventListener('resize', resize);

  volume.addEventListener('input', e => {
    const value = parseFloat(e.target.value)
    // preventing clipping of audio when volume is changed drastically in a quick motion
    // value = where we want to be, currentTime = start time, .01 = change (incremental) value
    gainNode.gain.setTargetAtTime(value, context.currentTime, .01)
  });

  treble.addEventListener('input', e => {
    const value = parseInt(e.target.value)
    trebleEQ.gain.setTargetAtTime(value, context.currentTime, .01)
  });

  mid.addEventListener('input', e => {
    const value = parseInt(e.target.value)
    midEQ.gain.setTargetAtTime(value, context.currentTime, .01)
  });
}

setupEventListeners();
setupContext();
resize();
drawVisualizer();
