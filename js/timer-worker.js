let END_DATE = null;
let COUNTDOWN = null;
let COUNTDOWN_INTERVAL = null;

self.addEventListener('message', e => {
  switch(e.data.action) {
    case "setupEndDate":
      setupCountdown(e.data.date);
      break;
    case "startCountdown":
      startCountdown();
      break;
  }
});

// new Date("2022-07-10T17:12:00")
const setupCountdown = endDate => {
  END_DATE = new Date(endDate);
  COUNTDOWN = _calculateCountdown()
  updateCountdown();
};

const startCountdown = () => {
  COUNTDOWN_INTERVAL = setInterval(() => {
    COUNTDOWN = _calculateCountdown()
    if (COUNTDOWN <= 0) {
      COUNTDOWN = 0;
      clearInterval(COUNTDOWN_INTERVAL);
      self.postMessage({ action: "endCountdown" });
    }
    updateCountdown();
  }, 10);
};

const _calculateCountdown = () => {
  return END_DATE.getTime() - new Date().getTime()
}

const updateCountdown = () => {
  const minutes = Math.floor(COUNTDOWN / 60000);
  const seconds = Math.floor((COUNTDOWN % 60000) / 1000);
  self.postMessage({ action: "updateCountdown", value: { minutes, seconds, remainingInSeconds: COUNTDOWN / 1000 } });
};
