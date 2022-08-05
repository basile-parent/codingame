import {FC} from 'react'
import {faPlay, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestActions.module.scss"

type UnitTestsActionsProps = {
    onPlayAllTest: () => void
}
const UnitTestsActions: FC<UnitTestsActionsProps> = ({ onPlayAllTest }: UnitTestsActionsProps) => {
    return (
        <>
            <button className={`button is-light ${ styles.unitTestsExecuteAll }`}
                    onClick={onPlayAllTest}
            >
                <FontAwesomeIcon icon={faPlay} /> Tous les tests
            </button>
            <button className={`button is-light ${ styles.submitSolution }`}>
                <FontAwesomeIcon icon={faCheck} /> Soumettre
            </button>
        </>
    )
}

export default UnitTestsActions