import {FC} from "react"
import styles from "./Chart.module.scss"
import CountUp from "react-countup"
import stripesUrl from "./radial-stripes.png"
import bronzeMedalUrl from "./medal-bronze.svg"
import silverMedalUrl from "./medal-silver.svg"
import goldMedalUrl from "./medal-gold.svg"

const delayBaseLine = 4.5
const delayStartShowPosition = delayBaseLine + 2
const delayBeforeCountUp = 2
const delayBeforeShowPlayer = 2
const delayBetweenPositions = 2

const thirdPositionSlideDuration = 4
const secondPositionSlideDuration = 5
const firstPositionSlideDuration = 6

const thirdPositionTotalDelay = delayStartShowPosition + delayBeforeCountUp + thirdPositionSlideDuration + delayBeforeShowPlayer
const secondPositionTotalDelay = thirdPositionTotalDelay + delayBeforeCountUp + delayBetweenPositions + secondPositionSlideDuration + delayBeforeShowPlayer

const showThirdPositionStartTime = delayStartShowPosition + delayBeforeCountUp
const showSecondPositionStartTime = thirdPositionTotalDelay + delayBetweenPositions + delayBeforeCountUp
const showFirstPositionStartTime = secondPositionTotalDelay + delayBetweenPositions + delayBeforeCountUp

type ChartProps = {}
const Chart: FC<ChartProps> = ({}: ChartProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.thirdPosition}>
                <p className={styles.player}>
                    Toto

                    <div className={styles.medal}>
                        <img src={bronzeMedalUrl} />
                    </div>
                </p>
                <p className={styles.score}>
                    <CountUp start={0}
                             end={1000}
                             duration={thirdPositionSlideDuration}
                             delay={showThirdPositionStartTime}
                    />
                </p>
            </div>
            <div className={styles.firstPosition}>
                <p className={styles.player}>
                    Titi

                    <div className={styles.medal}>
                        <img src={goldMedalUrl} />
                    </div>
                    <div className={styles.radialStripes}>
                        <img src={stripesUrl} />
                    </div>
                </p>
                <p className={styles.score}>
                    <CountUp start={0}
                             end={10000}
                             duration={firstPositionSlideDuration}
                             delay={showFirstPositionStartTime}
                    />
                </p>
            </div>
            <div className={styles.secondPosition}>
                <p className={styles.player}>
                    Tutu

                    <div className={styles.medal}>
                        <img src={silverMedalUrl} />
                    </div>
                </p>
                <p className={styles.score}>
                    <CountUp start={0}
                             end={5000}
                             duration={secondPositionSlideDuration}
                             delay={showSecondPositionStartTime}
                    />
                </p>
            </div>

            <div className={styles.baseLine} />
        </div>
    )
}

export default Chart