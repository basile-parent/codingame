import {FC} from 'react'
import {faPlay, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestActions.module.scss"

type UnitTestsActionsProps = {}
const UnitTestsActions: FC<UnitTestsActionsProps> = ({}: UnitTestsActionsProps) => {
    return (
        <>
            <button className={`button is-light ${ styles.unitTestsExecuteAll }`}>
                <FontAwesomeIcon icon={faPlay} /> Tous les tests
            </button>
            <button className={`button is-light ${ styles.submitSolution }`}>
                <FontAwesomeIcon icon={faCheck} /> Soumettre
            </button>
        </>
    )
}

export default UnitTestsActions