const getCode = () => flask.getCode();

function runTest(args, expectedResult) {
  const worker = new Worker('js/execute-code-worker.js');
  let workerTimeout = null

  worker.addEventListener('message', e => {
    switch (e.data.action) {
      case "debug":
        console.log(...e.data.value);
        break;
      case "notifyResult":
        console.log("notifyResult", e.data.value);
        worker.terminate()
        clearTimeout(workerTimeout)
        break;
    }
  });

  workerTimeout = setTimeout(() => {
    console.log("terminate")
    worker.terminate()
  }, 1000)

  worker.postMessage({action: "runTest", value: {code: getCode(), args, expectedResult}});
}

// runTest([2, 3], 5)

// let isEnding = false
// const updateCountdown = ({ minutes, seconds, remainingInSeconds }) => {
//   document.querySelector("#timer time").innerHTML =
//     (minutes + "").padStart(2, "0") + ":" + (seconds + "").padStart(2, "0");
//
//   if (isEnding && remainingInSeconds < 60) {
//     document.querySelector("#timer time").classList = [ "ending" ];
//     isEnding = true;
//   }
// };
//
// setupEndDate("2022-07-10T17:32:00")
// startCountdown()