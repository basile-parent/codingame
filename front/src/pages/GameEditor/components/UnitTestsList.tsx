import {FC, SyntheticEvent} from 'react'
import {faPlay, faSpinner, faWarning} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./UnitTestsList.module.scss"
import {UnitTestExecution, UnitTestExecutionStatus} from "../../../types/Game"
import _ from "lodash"

type UnitTestsListProps = {
    unitTests: UnitTestExecution[],
    onPlayTest: (test: UnitTestExecution) => void,
    onSelectTest: (test: UnitTestExecution) => void,
    selectedUnitTest: UnitTestExecution | null
}
const UnitTestsList: FC<UnitTestsListProps> = ({unitTests, onPlayTest, onSelectTest, selectedUnitTest}: UnitTestsListProps) => {
    return (
        <ol className={styles.list}>
            {
                unitTests.map((test, index) => (
                    <UnitTest unitTest={test}
                              number={index + 1}
                              onPlayTest={onPlayTest}
                              onSelectTest={onSelectTest}
                              key={`test-${index}`}
                              isSelected={test.id === selectedUnitTest?.id}
                    />
                ))
            }
        </ol>
    )
}

type UnitTestProps = {
    unitTest: UnitTestExecution,
    number: number,
    onPlayTest: (test: UnitTestExecution) => void,
    onSelectTest: (test: UnitTestExecution) => void,
    isSelected: boolean
}
const UnitTest: FC<UnitTestProps> = ({unitTest, number, onSelectTest, onPlayTest, isSelected}) => {
    const statusStyle = unitTest.status === UnitTestExecutionStatus.SUCCESS ? styles.isSuccess :
        unitTest.status === UnitTestExecutionStatus.FAIL ? styles.isFailure :
        unitTest.status === UnitTestExecutionStatus.IN_PROGRESS ? styles.isProgress :
            ""

    return (
        <li className={`${styles.unitTest} ${statusStyle} ${ isSelected && styles.selected }`}>
            <button className={styles.wrappingButton} onClick={() => onSelectTest(unitTest)}>
                <span className={styles.numero}>{_.padStart(String(number), 2, "0")}</span>

                <span className={styles.testName}>
                    { unitTest.name || `Test ${number}`}
                    {
                        unitTest.outdated &&
                        <FontAwesomeIcon icon={faWarning}
                                         title="Le code a changé depuis la dernière exécution du test."
                                         className={styles.outdated}
                        />
                    }
                </span>

                <button className={`button ${styles.button} is-light ${statusStyle}`}
                        disabled={unitTest.status === UnitTestExecutionStatus.IN_PROGRESS}
                        onClick={
                            (e: SyntheticEvent) => {
                                e.stopPropagation()
                                onPlayTest(unitTest)
                            }
                        }
                >
                    {
                        unitTest.status === UnitTestExecutionStatus.IN_PROGRESS ?
                            <FontAwesomeIcon icon={faSpinner} /> :
                            <FontAwesomeIcon icon={faPlay} />
                    }
                </button>
            </button>
        </li>
    )
}

export default UnitTestsList