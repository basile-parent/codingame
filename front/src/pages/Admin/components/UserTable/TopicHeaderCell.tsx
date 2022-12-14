import {FC, useCallback, useMemo, useState} from 'react'
import {useSelector} from "react-redux"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Topic, TopicStatus} from "../../../../types/Game"
import WebsocketManager from "../../../../common/components/WebsocketManager"
import styles from "./TopicHeaderCell.module.scss"
import {RootState} from "../../../../common/store"
import {Screen} from "../../../../types/Screen";

type TopicHeaderCellProps = {
    topic: Topic,
    onDetailTopic: (topic: Topic) => void
}
const TopicHeaderCell: FC<TopicHeaderCellProps> = ({topic, onDetailTopic}: TopicHeaderCellProps) => {
    const [ open, setOpen ] = useState(false)
    const game = useSelector((state: RootState) => state.game)
    const screen = useSelector((state: RootState) => state.screen)


    const handleStartTopic = useCallback(() => {
        WebsocketManager.startTopic(topic.id)
        setOpen(false)
    }, [])

    const handleCalculateScores = useCallback(() => {
        WebsocketManager.calculateTopicScore(topic.id)
        setOpen(false)
    }, [])

    const handleReinitTopic = useCallback(() => {
        WebsocketManager.reinitTopic(topic.id)
        setOpen(false)
    }, [])

    const handleDetails = useCallback(() => {
        onDetailTopic(topic)
        setOpen(false)
    }, [])

    return (
        <>
            <div className={`dropdown is-right ${ open && "is-active" } ${ styles.container }`}>
                <div className="dropdown-trigger">
                    <button className={styles.openButton}
                            onClick={() => setOpen(o => !o)}
                    >
                        #{topic.id}
                        <FontAwesomeIcon icon={faAngleDown} className={styles.icon}/>
                    </button>
                </div>
                <div className={`dropdown-menu ${ styles.dropdownMenu }`} id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleDetails}
                        >
                            D??tails
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleStartTopic}
                                disabled={!game?.started || [Screen.GAME_EDITOR, Screen.AFTER_GAME, Screen.PODIUM].includes(screen) }
                        >
                            D??marrer
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleCalculateScores}
                                disabled={!game?.started || screen !== Screen.AFTER_GAME || topic.status !== TopicStatus.FINISHED }
                        >
                            Calcul scores
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleReinitTopic}
                                disabled={![TopicStatus.FINISHED, TopicStatus.SCORE_CALCULATED].includes(topic.status)}
                        >
                            R??init
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopicHeaderCell