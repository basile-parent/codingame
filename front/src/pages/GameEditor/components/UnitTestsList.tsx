import {FC, useContext} from 'react'
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestsList.module.scss"
import {WSContext} from "../../../common/context/WSContext";

type UnitTestsListProps = {
    onPlayTest: (args: any[], expectedResult: any) => void
}
const UnitTestsList: FC<UnitTestsListProps> = ({ onPlayTest }: UnitTestsListProps) => {
    const { wsState } = useContext(WSContext)

    return (
        <ol className={styles.list}>
            {
                wsState.game?.topic.tests.map((test, index) => (
                    <li className={`${styles.unitTest}`} key={`test-${ index }`}>
                        <span>Test { index + 1 }</span>
                        <button className={`button ${ styles.button } is-light`}
                                onClick={
                                    () => onPlayTest(test.inputs, test.output)
                                }
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    </li>
                ))
            }
        </ol>
    )
}

export default UnitTestsList