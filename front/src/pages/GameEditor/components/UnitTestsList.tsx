import {FC} from 'react'
import {faPlay, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./UnitTestsList.module.scss"
import {UnitTestExecution, UnitTestExecutionStatus} from "../../../types/Game";

type UnitTestsListProps = {
    unitTests: UnitTestExecution[],
    onPlayTest: (test: UnitTestExecution) => void
}
const UnitTestsList: FC<UnitTestsListProps> = ({unitTests, onPlayTest}: UnitTestsListProps) => {
    return (
        <ol className={styles.list}>
            {
                unitTests.map((test, index) => (
                    <UnitTest unitTest={test}
                              number={index + 1}
                              onPlayTest={onPlayTest}
                              key={`test-${index}`}
                    />
                ))
            }
        </ol>
    )
}

type UnitTestProps = {
    unitTest: UnitTestExecution,
    number: number,
    onPlayTest: (test: UnitTestExecution) => void
}
const UnitTest: FC<UnitTestProps> = ({unitTest, number, onPlayTest}) => {
    const statusStyle = unitTest.status === UnitTestExecutionStatus.SUCCESS ? styles.isSuccess :
        unitTest.status === UnitTestExecutionStatus.FAIL ? styles.isFailure :
        unitTest.status === UnitTestExecutionStatus.IN_PROGRESS ? styles.isProgress :
            ""

    return (
        <li className={`${styles.unitTest} ${statusStyle}`}
        >
            <span>Test {number}</span>
            <button className={`button ${styles.button} is-light ${statusStyle}`}
                    disabled={unitTest.status === UnitTestExecutionStatus.IN_PROGRESS}
                    onClick={
                        () => onPlayTest(unitTest)
                    }
            >
                {
                    unitTest.status === UnitTestExecutionStatus.IN_PROGRESS ?
                        <FontAwesomeIcon icon={faSpinner} /> :
                        <FontAwesomeIcon icon={faPlay} />
                }
            </button>
        </li>
    )
}

export default UnitTestsList