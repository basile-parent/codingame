import {FC} from 'react'
import {useSelector} from "react-redux"
import {faCheck, faPlay} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./UnitTestActions.module.scss"
import {RootState} from "../../../common/store"

type UnitTestsActionsProps = {
    onPlayAllTest: () => void,
    onCommitCode: () => void,
}
const UnitTestsActions: FC<UnitTestsActionsProps> = ({ onPlayAllTest, onCommitCode }: UnitTestsActionsProps) => {
    const connected = useSelector((state: RootState) => state.connected)
    
    return (
        <>
            <button className={`button is-light ${ styles.unitTestsExecuteAll }`}
                    onClick={onPlayAllTest}
            >
                <FontAwesomeIcon icon={faPlay} /> Tous les tests
            </button>
            <button className={`button is-light ${ styles.submitSolution }`}
                    onClick={onCommitCode}
                    disabled={!connected}
            >
                <FontAwesomeIcon icon={faCheck} /> Soumettre
            </button>
        </>
    )
}

export default UnitTestsActions