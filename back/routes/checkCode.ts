import * as WorkerThread from "worker_threads"

const tests = [
  {args: [1, 2], expectedResult: 3},
  {args: [4, 0], expectedResult: 4},
  {args: [-2, 2], expectedResult: 0},
  {args: [1000000000, 1], expectedResult: 1000000001},
]

const checkCode = (req, res, next) => {
  const code = req.body

  testUserCode(code)

  res.status(200).json({success: true, message: 'Code submitted'})
  next()
}

const testUserCode = code => {
  let resolvedCount = 0

  Promise.allSettled(
    tests.map(test =>
      _runTest(code, test.args, test.expectedResult)
        .then(result => {
          resolvedCount++
          return result
        })
    )
  ).then((r) => console.log("then", r, resolvedCount, tests.length))

}

const _runTest = (code, args, expectedResult) => {
  return new Promise((resolve, reject) => {
    let workerTimeout
    const worker = new WorkerThread.Worker(
        "./routes/checkCode-worker.ts",
        {workerData: {code, args, expectedResult}}
    )
    worker.on('message', e => {
      const {action, value} = e
      switch (action) {
        case "notifyResult":
          const isSuccess = value
          clearTimeout(workerTimeout)
          if (isSuccess) {
            resolve("OK")
          } else {
            reject("Bad result")
          }
          break
      }
    })

    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(`Worker stopped with exit code ${code}`)
    })

    workerTimeout = setTimeout(() => {
      reject("timeout")
      worker.terminate()
    }, 1000)

  })
}

export default checkCode