self.onmessage = (message) => {
  switch(message.data.action) {
    case "runTest":
      const { code, args, expectedResult } = message.data.value
      runTest(code, args, expectedResult);
      break;
  }
}

let debugDetails = ""

const debug = (...args) => {
  debugDetails += "> " + args.join(", ") + "\n"
}

const runTest = (code, args, expectedResult) => {
  const solutionFn = new Function("...inputArray", code)
  const result = solutionFn(...args)
  const isSuccess = result === expectedResult
  let details = debugDetails + "\n"
  if (isSuccess) {
    details += `Expected output:\n${ expectedResult }`
  } else {
    details += `Expected output:\n${ expectedResult }\n\nActual:\n${ result }`
  }
  notify(isSuccess, details)
}

const notify = (isSuccess, details) => {
  self.postMessage({ action: "notifyResult", value: {isSuccess, details} });
}