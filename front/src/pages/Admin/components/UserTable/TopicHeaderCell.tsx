import {FC, useCallback, useContext, useMemo, useState} from 'react'
import {Topic, TopicStatus} from "../../../../types/Game"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./TopicHeaderCell.module.scss"
import {WSContext} from "../../../../common/context/WSContext";

type TopicHeaderCellProps = {
    topic: Topic,
    onDetailTopic: (topic: Topic) => void
}
const TopicHeaderCell: FC<TopicHeaderCellProps> = ({topic, onDetailTopic}: TopicHeaderCellProps) => {
    const [ open, setOpen ] = useState(false)
    const { wsState: { game }, dispatch } = useContext(WSContext)

    const handleStartTopic = useCallback(() => {
        dispatch({ type: "startTopic", payload: topic.id })
        setOpen(false)
    }, [])

    const handleReinitTopic = useCallback(() => {
        dispatch({ type: "reinitTopic", payload: topic.id })
        setOpen(false)
    }, [])

    const handleDetails = useCallback(() => {
        onDetailTopic(topic)
        setOpen(false)
    }, []);

    const isDisabled = useMemo<boolean>(() => !game?.started || !!game?.topic, [ game ])

    return (
        <>
            <div className={`dropdown is-right ${ open && "is-active" } ${ styles.container }`}>
                <div className="dropdown-trigger">
                    <button className={styles.openButton}
                            onClick={() => setOpen(o => !o)}
                            disabled={isDisabled}
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
                                disabled={topic.status !== TopicStatus.WAITING}
                        >
                            Démarrer
                        </button>
                        <button className={`dropdown-item ${ styles.dropdownButton }`}
                                onClick={handleReinitTopic}
                                disabled={topic.status !== TopicStatus.FINISHED}
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