import {FC, PropsWithChildren} from "react"
import CountUp from "react-countup"
import {useSelector} from "react-redux"
import styles from "./Chart.module.scss"
import stripesUrl from "./radial-stripes.png"
import bronzeMedalUrl from "./medal-bronze.svg"
import silverMedalUrl from "./medal-silver.svg"
import goldMedalUrl from "./medal-gold.svg"
import {GamePlayer} from "../../../types/Player"
import {RootState} from "../../../common/store"

const delayBeforeCountUp = 2
const thirdPositionSlideDuration = 4
const secondPositionSlideDuration = 5
const firstPositionSlideDuration = 6


type PlayerNameWithScore = {
    names: string[],
    score: number,
    isVacant: boolean
}

type ChartProps = {}
const Chart: FC<ChartProps> = ({}: ChartProps) => {
    const players = useSelector((state: RootState) => state.players)

    return (
        <div className={styles.container}>
            <PodiumBar players={players}
                       position={3}
                       medalUrl={bronzeMedalUrl}
                       styleClass={styles.thirdPosition}
                       slideDuration={thirdPositionSlideDuration}
            />
            <PodiumBarWithHalo players={players}
                       position={1}
                       medalUrl={goldMedalUrl}
                       styleClass={styles.firstPosition}
                       slideDuration={firstPositionSlideDuration}
            />
            <PodiumBar players={players}
                       position={2}
                       medalUrl={silverMedalUrl}
                       styleClass={styles.secondPosition}
                       slideDuration={secondPositionSlideDuration}
            />

            <div className={styles.baseLine}/>
        </div>
    )
}

type PodiumBarProps = PropsWithChildren & {
    players: GamePlayer[],
    position: number,
    medalUrl: string,
    styleClass: string,
    slideDuration: number
}
const PodiumBar: FC<PodiumBarProps> = ({players, position, medalUrl, styleClass, slideDuration, children}) => {
    const additionalScreenProps = useSelector((state: RootState) => state.additionalScreenProps)
    const positionPlayers = reducePlayersByPosition(players, position)

    const isRevealed = isPositionRevealed(additionalScreenProps, position)
    if (!isRevealed) {
        return null
    }

    return (
        <div className={`${styleClass} ${isRevealed ? styles.show : ""}`}>
            <p className={`${styles.player} ${positionPlayers.isVacant ? styles.vacant : ""}`}
               dangerouslySetInnerHTML={{__html: positionPlayers.names.join("<br/>")}}
               style={{marginTop: positionPlayers.names.length ? ((positionPlayers.names.length - 1) * -30) + "px" : 0}}
            />
            <p className={styles.score}>
                {
                    isRevealed &&
                  <CountUp start={0}
                           end={positionPlayers.score + 1000}
                           duration={slideDuration}
                           delay={delayBeforeCountUp}
                  />
                }
            </p>

            <div className={styles.medal}>
                <img src={medalUrl} alt="Médaille"/>
            </div>

            { children }
        </div>
    )
}

const PodiumBarWithHalo: FC<PodiumBarProps> = (props) => {
    const additionalScreenProps = useSelector((state: RootState) => state.additionalScreenProps)
    const positionPlayers = reducePlayersByPosition(props.players, props.position)

    const isRevealed = isPositionRevealed(additionalScreenProps, props.position)
    if (!isRevealed) {
        return null
    }

    return (
        <>
            <PodiumBar { ...props }>
                <div className={styles.radialStripes}
                     style={{marginTop: positionPlayers.names.length ? ((positionPlayers.names.length - 1) * -15) + "px" : 0}}
                >
                    <img src={stripesUrl}/>
                </div>
            </PodiumBar>
        </>
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
                names: acc.names ? [...acc.names, item.name].filter(n => n) : [item.name],
                score: item.score,
                isVacant: false
            }),
        {} as PlayerNameWithScore)
}

const isPositionRevealed = (additionalScreenProps: string[], position: number) => {
    return additionalScreenProps.includes(`podium-${position}-revealed`)
}

export default Chart