import {FC} from 'react'
import {Topic} from "../../../../types/Game"
import styles from "./DetailModal.module.scss"
import Modal from "../../../../common/components/Modal";

type DetailModalProps = {
    topic: Topic,
    onClose: () => void
}
const DetailModal: FC<DetailModalProps> = ({ topic, onClose }: DetailModalProps) => {
    return (
        <Modal title={topic.summary}
               onClose={onClose}
               open={true}
        >
            <p>Mode de jeu: {topic.gameMode}</p>
            <p>Durée: {topic.timer}s</p>
            <p>Points: {topic.points}</p>
            <br/>
            <div className={styles.subject}>
                <p>Problème: </p>
                <p dangerouslySetInnerHTML={{ __html: topic.subject}} />
            </div>
        </Modal>
    )
}

export default DetailModal