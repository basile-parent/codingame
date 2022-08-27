import {FC} from 'react'
import {Topic} from "../../../../types/Game"
import styles from "./DetailModal.module.scss"
import Modal from "../../../../common/components/Modal";
import dateUtils from "../../../../utils/dateUtils";

type DetailModalProps = {
    topic: Topic,
    onClose: () => void
}
const DetailModal: FC<DetailModalProps> = ({ topic, onClose }: DetailModalProps) => {
    return (
        <Modal title={topic.summary}
               onClose={onClose}
               open={true}
               className={styles.container}
        >
            <ul className={styles.detailsList}>
                <li><span className={styles.detailsLabel}>Mode de jeu:</span> <span className={styles.detailsValue}>{topic.gameMode}</span></li>
                <li><span className={styles.detailsLabel}>Durée: </span>      <span className={styles.detailsValue}>{dateUtils.timeToString(topic.timer / 1000)}</span></li>
                <li><span className={styles.detailsLabel}>Points: </span>     <span className={styles.detailsValue}>{topic.points}</span></li>
            </ul>
            <br/>
            <div className={styles.subject}>
                <span className={styles.detailsLabel}>Problème: </span>
                <p dangerouslySetInnerHTML={{ __html: topic.subject}} />
            </div>
        </Modal>
    )
}

export default DetailModal