import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext";
import styles from "./InstructionsModal.module.scss"
import gameModeUtils from "../../../utils/gameModeUtils";
import dateUtils from "../../../utils/dateUtils";

type InstructionsModalProps = {
    open: boolean,
    onClose: () => void
}
const InstructionsModal: FC<InstructionsModalProps> = ({open, onClose}: InstructionsModalProps) => {
    const {wsState: { game }} = useContext(WSContext)
    const topic = game!.topic!
    
    return (
        <div className={`modal ${open ? "is-active" : ""} ${styles.modal}`}>
            <div className="modal-background"></div>
            <div className={`modal-content ${styles.modalContent}`}>
                <p className={styles.gameMode}>Mode de
                    jeu: {gameModeUtils.informations[topic.gameMode || ""]?.title || "???"}</p>
                <p className={styles.instructions}>
                    {gameModeUtils.informations[topic.gameMode || ""]?.instructions || "???"}
                </p>

                {
                    topic.timer &&
                    <p className={styles.timer}>
                      Limite de temps: {dateUtils.timeToString(topic.timer)}
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