let startTime;
let running = false;
let elapsedTime = 0;
let laps = [];
let lapCount = 1;

function toggleStartStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    running = true;
    document.getElementById('startStop').textContent = 'Stop';
    update();
  } else {
    running = false;
    elapsedTime = Date.now() - startTime;
    document.getElementById('startStop').textContent = 'Start';
  }
}

function update() {
  if (running) {
    elapsedTime = Date.now() - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
    requestAnimationFrame(update);
  }
}

function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let millis = Math.floor((milliseconds % 1000) / 10);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(millis)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function recordLap() {
  if (running) {
    let lapTime = formatTime(Date.now() - startTime);
    laps.push({ lap: lapCount, time: lapTime });
    lapCount++;
    displayLaps();
  }
}

function displayLaps() {
  let lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach(lap => {
    let li = document.createElement('li');
    li.textContent = `Lap ${lap.lap}: ${lap.time}`;
    lapsList.appendChild(li);
  });
}

function reset() {
  running = false;
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  lapCount = 1;
  document.getElementById('startStop').textContent = 'Start';
  document.getElementById('display').textContent = '00:00:00:00';
  document.getElementById('laps').innerHTML = '';
}
