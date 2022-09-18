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
  console.log("Initial update", COUNTDOWN)
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
  }, 1000);
};

const _calculateCountdown = () => {
  return Math.max(0, END_DATE.getTime() - new Date().getTime())
}

const updateCountdown = () => {
  self.postMessage({ action: "updateCountdown", value: { remainingInSeconds: Math.round(COUNTDOWN / 1000) } });
};
