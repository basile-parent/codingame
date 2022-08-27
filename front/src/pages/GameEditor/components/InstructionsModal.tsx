import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import styles from "./InstructionsModal.module.scss"
import gameModeUtils from "../../../utils/gameModeUtils"
import dateUtils from "../../../utils/dateUtils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type InstructionsModalProps = {
    open: boolean,
    onClose: () => void
}
const InstructionsModal: FC<InstructionsModalProps> = ({open, onClose}: InstructionsModalProps) => {
    const {wsState: { game }} = useContext(WSContext)
    const topic = game!.topic!
    const informations = gameModeUtils.informations[topic.gameMode || ""]

    return (
        <div className={`modal ${open ? "is-active" : ""} ${styles.modal}`}>
            <div className="modal-background" />
            <div className={`modal-content ${styles.modalContent}`}>
                <p className={styles.gameMode}>
                    { informations.icon && <FontAwesomeIcon icon={informations.icon} className={styles.icon} />}
                    Mode de jeu: {informations?.title || "???"}
                </p>
                <p className={styles.instructions}>
                    {informations?.instructions || "???"}
                </p>

                {
                    topic.timer &&
                    <p className={styles.timer}>
                      Limite de temps: {dateUtils.timeToString(topic.timer / 1000)}
                    </p>
                }

                <div className={styles.modalActions}>
                    <button className="button is-primary modal-button" onClick={onClose}>
                        Fermer
                    </button>
                </div>
            </div>
            <button className="modal-close" aria-label="close" onClick={onClose}/>
        </div>
    )
}

export default InstructionsModal