import {FC} from 'react'
import styles from "./OutputConsole.module.scss"
import {UnitTestExecution, UnitTestExecutionStatus} from "../../../types/Game";

type OutputConsoleProps = {
    selectedUnitTest: UnitTestExecution | null
}
const OutputConsole: FC<OutputConsoleProps> = ({ selectedUnitTest }: OutputConsoleProps) => {
    if (!selectedUnitTest) {
        return <></>
    }
    return (
        <>
            <p className={styles.title}>Sortie standard:</p>
            <pre className={styles.console}>{ selectedUnitTest.consoleOutput }</pre>

            {
                selectedUnitTest.status === UnitTestExecutionStatus.SUCCESS &&
                    <div className={`notification ${ styles.notification } is-success is-light`}>Success</div>
            }
            {
                selectedUnitTest.status === UnitTestExecutionStatus.FAIL &&
                    <div className={`notification ${ styles.notification } is-danger is-light`}>Fail</div>
            }

        </>
    )
}

export default OutputConsole