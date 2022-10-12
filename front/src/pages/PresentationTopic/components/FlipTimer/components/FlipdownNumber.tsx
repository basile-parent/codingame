import {FC, useEffect, useState} from "react"
import styles from "./FlipdownNumber.module.scss"

type FlipdownNumberProps = {
    previousNumber: number,
    currentNumber: number,
}
const FlipdownNumber: FC<FlipdownNumberProps> = ({ previousNumber, currentNumber }: FlipdownNumberProps) => {
    // const [ isAnimated, setIsAnimated ] = useState(previousNumber !== currentNumber)
    const [ isAnimated, setIsAnimated ] = useState(true)
    const [ numbers, setNumbers ] = useState({previousNumber, currentNumber})

    useEffect(() => {
        // console.log("isAnimated", previousNumber, currentNumber,  previousNumber !== currentNumber)
        setNumbers({previousNumber, currentNumber})
        setIsAnimated(previousNumber !== currentNumber)
        setTimeout(() => {
            setIsAnimated(false)
            setNumbers({previousNumber: currentNumber, currentNumber: 0})
        }, 500)
    }, [ previousNumber, currentNumber ])

    // console.log("isAnimated", isAnimated)

    return (
        <div className={`${ styles.wrapper } ${ isAnimated ? styles.animated : "" }`}>
            <div className={styles.before}>
                <div className={styles.upperPart}>
                    <span className={styles.content}>
                        { numbers.previousNumber }
                    </span>
                </div>
                <div className={styles.lowerPart}>
                    <span className={styles.content}>
                        { numbers.previousNumber }
                    </span>
                </div>
            </div>
            <div className={styles.after}>
                <div className={styles.upperPart}>
                    <span className={styles.content}>
                        { numbers.currentNumber }
                    </span>
                </div>
                <div className={styles.lowerPart}>
                    <span className={styles.content}>
                        { numbers.currentNumber }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FlipdownNumber