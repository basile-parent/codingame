import { Worker } from "worker_threads";

const runTest = (code, args, expectedResult) => {
    return new Promise((resolve, reject) => {
        let workerTimeout
        const worker = new Worker(
            __dirname + "/../utils/checkCode-worker.js",
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
        }, 2000)

    })
}

export default {
    runTest
}