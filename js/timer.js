const worker = new Worker('js/timer-worker.js');

const setupEndDate = date => {
  worker.postMessage({ action: "setupEndDate", date });
};

const startCountdown = () => {
  worker.postMessage({ action: "startCountdown" });
};

worker.addEventListener('message', e => {
  switch(e.data.action) {
    case "updateCountdown":
      updateCountdown(e.data.value);
      break;
    case "endCountdown":
      // showEndOfTime();
      break;
  }
});

let isEnding = false
const updateCountdown = ({ minutes, seconds, remainingInSeconds }) => {
  const countdown = (minutes + "").padStart(2, "0") + ":" + (seconds + "").padStart(2, "0")
  document.querySelector("#timer time").innerHTML = countdown;
  if (isEnding && remainingInSeconds < 60) {
    document.querySelector("#timer time").classList = [ "ending" ];
    isEnding = true;
  }
};

setupEndDate("2022-07-10T17:32:00")
startCountdown()