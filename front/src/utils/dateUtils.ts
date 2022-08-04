const timeToString = (timeInSeconds: number) => {
    const hours   = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60)
    const seconds = timeInSeconds % 60

    if (hours) {
        return [ hours, minutes, seconds ].map(_padNumber).join(":")
    }

    return [ minutes, seconds ].map(_padNumber).join(":")
}

const _padNumber = (n: number): string => {
    if (n < 10) {
        return "0" + String(n)
    }
    return String(n)
}

const dateUtils = {
    timeToString
}

export default dateUtils