import {FC} from 'react'
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestsList.module.scss"

type UnitTestsListProps = {
    onPlayTest: (args: any[], expectedResult: any) => void
}
const UnitTestsList: FC<UnitTestsListProps> = ({ onPlayTest }: UnitTestsListProps) => {
    return (
        <ol className={styles.list}>
            <li className={`${styles.unitTest} ${ styles.isSuccess }`}>
                <span>Test 1 : 1 + 2</span>
                <button className={`button ${ styles.button } is-light`} onClick={() => onPlayTest([1, 2], 3)}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            </li>

            <li className={`${styles.unitTest} ${ styles.isFailure }`}>
                <span>Test 2 : 5 + 0</span>
                <button className={`button ${ styles.button } is-light`} onClick={() => onPlayTest([5, 0], 5)}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            </li>
        </ol>
    )
}

export default UnitTestsList