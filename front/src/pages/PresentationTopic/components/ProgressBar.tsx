import {FC} from "react"
import styles from "./ProgressBar.module.scss"

type ProgressBarProps = {
    initialDuration: number,
    remainingTime: number,
    isEnding: boolean
}
const ProgressBar: FC<ProgressBarProps> = ({ initialDuration, remainingTime, isEnding }: ProgressBarProps) => {
    return (
        <div className={styles.wrapper}></div>
    )
}

export default ProgressBar