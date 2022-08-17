import {parentPort, workerData} from "worker_threads"

const quietConsole = `
console = {};
console.log = function(){};
console.trace = function(){};
console.debug = function(){};
console.info = function(){};
console.warn = function(){};
console.error = function(){};
console.group = function(){};
console.group = function(){};
console.groupEnd = function(){};
console.groupCollapsed = function(){};
console.time = function(){};
console.timeEnd = function(){};
console.timeLog = function(){};
console.timeStamp = function(){};
console.clear = function(){};
console.count = function(){};
console.countReset = function(){};
console.table = function(){};
console.dir = function(){};
console.dirxml = function(){};
console.assert = function(){};
console.exception = function(){};
console.profile = function(){};
console.profileEnd = function(){};

const debug = () => {
  // Debug don't do anything here
}

`

const { code, args, expectedResult } = workerData
runTest(quietConsole + code, args, expectedResult)

function runTest (code, args, expectedResult) {
  const solutionFn = new Function("...inputArray", code)
  const result = solutionFn(...args)
  notify(result === expectedResult)
}

function notify(isSuccess) {
  parentPort.postMessage({action: "notifyResult", value: isSuccess})
}