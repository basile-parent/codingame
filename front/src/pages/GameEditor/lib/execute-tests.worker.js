self.onmessage = (message) => {
  switch(message.data.action) {
    case "runTest":
      const { code, args, expectedResult } = message.data.value
      runTest(code, args, expectedResult);
      break;
  }
}

const debug = (...args) => {
  self.postMessage({ action: "debug", value: [ ...args ] });
}

const runTest = (code, args, expectedResult) => {
  const solutionFn = Function("...inputArray", code)
  const result = solutionFn(...args)
  notify(result === expectedResult)
}

const notify = (isSuccess, errorDetails) => {
  self.postMessage({ action: "notifyResult", value: {isSuccess, errorDetails} });
}