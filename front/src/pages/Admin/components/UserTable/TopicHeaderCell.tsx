import {FC, useCallback, useMemo, useState} from 'react'
import {useSelector} from "react-redux"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Topic, TopicStatus} from "../../../../types/Game"
import WebsocketManager from "../../../../common/components/WebsocketManager"
import styles from "./TopicHeaderCell.module.scss"
import {RootState} from "../../../../common/store"

type TopicHeaderCellProps = {
    topic: Topic,
    onDetailTopic: (topic: Topic) => void
}
const TopicHeaderCell: FC<TopicHeaderCellProps> = ({topic, onDetailTopic}: TopicHeaderCellProps) => {
    const [ open, setOpen ] = useState(false)
    const game = useSelector((state: RootState) => state.game)

    const handleStartTopic = useCallback(() => {
        WebsocketManager.startTopic(topic.id)
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
                            Détails
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleStartTopic}
                                disabled={topic.status !== TopicStatus.WAITING || !game?.started}
                        >
                            Démarrer
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleReinitTopic}
                                disabled={![TopicStatus.FINISHED, TopicStatus.SCORE_CALCULATED].includes(topic.status)}
                        >
                            Réinit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopicHeaderCell