import {FC, useContext} from 'react'
import {faPlay, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestActions.module.scss"
import {WSContext} from "../../../common/context/WSContext";

type UnitTestsActionsProps = {
    onPlayAllTest: () => void,
    onCommitCode: () => void,
}
const UnitTestsActions: FC<UnitTestsActionsProps> = ({ onPlayAllTest, onCommitCode }: UnitTestsActionsProps) => {
    const { wsState } = useContext(WSContext)
    return (
        <>
            <button className={`button is-light ${ styles.unitTestsExecuteAll }`}
                    onClick={onPlayAllTest}
            >
                <FontAwesomeIcon icon={faPlay} /> Tous les tests
            </button>
            <button className={`button is-light ${ styles.submitSolution }`}
                    onClick={onCommitCode}
                    disabled={!wsState.connected}
            >
                <FontAwesomeIcon icon={faCheck} /> Soumettre
            </button>
        </>
    )
}

export default UnitTestsActions