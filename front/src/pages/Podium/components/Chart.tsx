import {FC, useContext} from "react"
import styles from "./Chart.module.scss"
import CountUp from "react-countup"
import stripesUrl from "./radial-stripes.png"
import bronzeMedalUrl from "./medal-bronze.svg"
import silverMedalUrl from "./medal-silver.svg"
import goldMedalUrl from "./medal-gold.svg"
import {GamePlayer} from "../../../types/Player";
import {WSContext} from "../../../common/context/WSContext";

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

type PlayerNameWithScore = {
    names: string[],
    score: number,
    isVacant: boolean
}

type ChartProps = {}
const Chart: FC<ChartProps> = ({}: ChartProps) => {
    const { wsState: {players}} = useContext(WSContext)

    const thirdPositionPlayers = reducePlayersByPosition(players, 3)
    const secondPositionPlayers = reducePlayersByPosition(players, 2)
    const firstPositionPlayers = reducePlayersByPosition(players, 1)

    return (
        <div className={styles.container}>
            <div className={styles.thirdPosition}>
                <p className={`${ styles.player } ${ thirdPositionPlayers.isVacant ? styles.vacant : "" }`}
                   dangerouslySetInnerHTML={{ __html: thirdPositionPlayers.names.join("<br/>") }}
                   style={{ marginTop: thirdPositionPlayers.names.length ? ((thirdPositionPlayers.names.length - 1) * -30) + "px" : 0 }}
                />
                <p className={styles.score}>
                    <CountUp start={0}
                             end={ thirdPositionPlayers.score }
                             duration={thirdPositionSlideDuration}
                             delay={showThirdPositionStartTime}
                    />
                </p>

                <div className={styles.medal}>
                    <img src={bronzeMedalUrl} />
                </div>
            </div>
            <div className={styles.firstPosition}>
                <p className={`${ styles.player } ${ firstPositionPlayers.isVacant ? styles.vacant : "" }`}
                   dangerouslySetInnerHTML={{ __html: firstPositionPlayers.names.join("<br/>") }}
                   style={{ marginTop: firstPositionPlayers.names.length ? ((firstPositionPlayers.names.length - 1) * -30) + "px" : 0 }}
                />
                <p className={styles.score}>
                    <CountUp start={0}
                             end={ firstPositionPlayers.score }
                             duration={firstPositionSlideDuration}
                             delay={showFirstPositionStartTime}
                    />
                </p>
                <div className={styles.medal}>
                    <img src={goldMedalUrl} />
                </div>
                <div className={styles.radialStripes}
                     style={{ marginTop: firstPositionPlayers.names.length ? ((firstPositionPlayers.names.length - 1) * -15) + "px" : 0 }}
                >
                    <img src={stripesUrl} />
                </div>
            </div>
            <div className={styles.secondPosition}>
                <p className={`${ styles.player } ${ secondPositionPlayers.isVacant ? styles.vacant : "" }`}
                   dangerouslySetInnerHTML={{ __html: secondPositionPlayers.names.join("<br/>") }}
                   style={{ marginTop: secondPositionPlayers.names.length ? ((secondPositionPlayers.names.length - 1) * -30) + "px" : 0 }}
                />
                <p className={styles.score}>
                    <CountUp start={0}
                             end={ secondPositionPlayers.score }
                             duration={secondPositionSlideDuration}
                             delay={showSecondPositionStartTime}
                    />
                </p>

                <div className={styles.medal}>
                    <img src={silverMedalUrl} />
                </div>
            </div>

            <div className={styles.baseLine} />
        </div>
    )
}

const reducePlayersByPosition = (players: GamePlayer[], position: number): PlayerNameWithScore => {
    const playersOnThatPosition = players.filter(p => p.position === position)

    if (!playersOnThatPosition.length) {
        return {
            names: ["Personne"],
            score: 0,
            isVacant: true
        }
    }

    return playersOnThatPosition.reduce((acc, item) =>
        ({
            names: acc.names ? [...acc.names, item.name].filter(n=>n) : [ item.name ],
            score: item.score,
            isVacant: false
        }),
        {} as PlayerNameWithScore)
}

export default Chart