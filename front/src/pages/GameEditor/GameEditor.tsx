import {FC, useCallback, useMemo, useState} from 'react'
import {throttle} from 'lodash'
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import {Editor, Header, OtherPlayers, OutputConsole, TopicInstructions, UnitTestsActions, UnitTestsList} from "./components"
import styles from "./GameEditor.module.scss"
import {DisplayMode} from "../../types/DisplayMode"
import InstructionsModal from "./components/InstructionsModal"
import {UnitTestExecution, UnitTestExecutionStatus} from "../../types/Game"
import ModalConfirm from "../../common/components/ModalConfirm/ModalConfirm"
import playerUtils from "../../utils/playerUtils"
import WebsocketManager from "../../common/components/WebsocketManager"
import {RootState} from "../../common/store"

type GameEditorProps = {}
const GameEditor: FC<GameEditorProps> = ({}: GameEditorProps) => {
    const game = useSelector((state: RootState) => state.game)
    const mode = useSelector((state: RootState) => state.mode)

    const [code, setCode] = useState<string>(playerUtils.getSavedCode() || game!.topic!.defaultCode || "")
    const [dialogOpen, setDialogOpen] = useState<boolean>(true)

    const [unitTests, setUnitTests] = useState<UnitTestExecution[]>(game!.topic!.tests.map((test, index) => ({
        ...test,
        id: index,
        status: UnitTestExecutionStatus.WAIT,
        outdated: false
    })))
    const [selectedUnitTest, setSelectedUnitTest] = useState<UnitTestExecution | null>(null)

    const saveTempCode = useMemo(() =>
            throttle(async (code: string) => {
                WebsocketManager.saveTempCode(code)
            }, 1000)
        , [])
    const onCodeChange = useCallback((newCode: string) => {
        // setSelectedUnitTest(null)
        // setUnitTests(unitTests => unitTests.map(unitTest => ({
        //     ...unitTest,
        //     status: UnitTestExecutionStatus.WAIT,
        //     consoleOutput: undefined
        // })))
        setUnitTests(unitTests => unitTests.map(unitTest => ({
            ...unitTest,
            outdated: !!unitTest.consoleOutput
        })))
        playerUtils.saveCode(newCode)
        saveTempCode(newCode)
        setCode(newCode)
    }, [])
    const executeTest = useCallback((testExecution: UnitTestExecution) => {
        const updatedTestExecution = { ...testExecution, outdated: false };
        setSelectedUnitTest(updatedTestExecution)
        setUnitTests(unitTests => unitTests.map(unitTest => ({
            ...unitTest,
            outdated: unitTest.id === testExecution.id ? false : unitTest.outdated
        })))
        return runTest(code, updatedTestExecution.inputs, updatedTestExecution.output)
            .then((details: string) => {
                return {
                    ...updatedTestExecution,
                    status: UnitTestExecutionStatus.SUCCESS,
                    consoleOutput: details
                } as UnitTestExecution
            })
            .catch(details => {
                return {
                    ...updatedTestExecution,
                    status: UnitTestExecutionStatus.FAIL,
                    consoleOutput: details
                } as UnitTestExecution
            })
            .then((newExecutionValue: UnitTestExecution) => {
                setSelectedUnitTest(newExecutionValue)
                setUnitTests(unitTests => unitTests.map(unitTest => {
                    if (unitTest.id !== testExecution.id) {
                        return unitTest
                    }
                    return newExecutionValue
                }))

                if (newExecutionValue.status === UnitTestExecutionStatus.FAIL) {
                    throw newExecutionValue.consoleOutput
                }
            })
    }, [code])
    const onSelectTest = useCallback((testExecution: UnitTestExecution) => {
        setSelectedUnitTest(testExecution)
    }, [code])

    const executeAllTest = useCallback(() => {
        // Execute sequentially until an error occurred
        unitTests.reduce(
            (p, test) =>
                p.then(_ => executeTest(test)),
            Promise.resolve()
        )
    }, [ unitTests ])

    const commitCode = useCallback(() => {
        ModalConfirm.confirm({
            message: "??tes-vous s??r de vouloir soumettre votre code ? Cette action est d??finitive.",
            onConfirm: () => WebsocketManager.commitCode(code)
        })
    }, [ code ])

    return (
        <>
            <InstructionsModal open={dialogOpen} onClose={() => setDialogOpen(false)}/>
            <article className={styles.gamePage + " page"}>
                <section className={styles.upperSection}>
                    <Header/>

                    <section className={styles.upperSectionContent}>
                        <TopicInstructions />
                        <Editor code={code} updateCode={onCodeChange}/>
                    </section>
                </section>

                <section className={styles.lowerSection}>
                    <section className={styles.lowerSectionContent}>
                        <section className={styles.output}>
                            <section className={styles.otherPlayers}>
                                <OtherPlayers/>
                            </section>
                            <section className={styles.outputConsole}>
                                <OutputConsole selectedUnitTest={selectedUnitTest}/>
                            </section>
                        </section>

                        {
                            mode === DisplayMode.PLAYER &&
                            <section className={styles.unitTests}>
                              <section className={styles.unitTestsList}>
                                <UnitTestsList unitTests={unitTests}
                                               onPlayTest={executeTest}
                                               onSelectTest={onSelectTest}
                                               selectedUnitTest={selectedUnitTest}
                                />
                              </section>
                              <section className={styles.unitTestsActions}>
                                <UnitTestsActions onPlayAllTest={executeAllTest}
                                                  onCommitCode={commitCode}
                                />
                              </section>
                            </section>
                        }

                        {
                            mode === DisplayMode.ADMIN &&
                            <section className={styles.adminControls}>
                              <button className={`button is-light ${styles.unitTestsExecuteAll}`}>
                                <FontAwesomeIcon icon={faCheck}/> Terminer le sujet
                              </button>
                            </section>
                        }

                    </section>
                </section>
            </article>
        </>
    )
}

const runTest = (code: string, args: any[], expectedResult: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./lib/execute-tests.worker.js', import.meta.url))
        let workerTimeout: ReturnType<typeof setTimeout> | null = null

        worker.addEventListener('error', e => {
            reject(e.message)
            worker.terminate()
            workerTimeout && clearTimeout(workerTimeout)
        })
        worker.addEventListener('message', e => {
            switch (e.data.action) {
                // case "debug":
                //     console.log(...e.data.value)
                //     break
                case "notifyResult":
                    const {isSuccess, details} = e.data.value
                    if (isSuccess) {
                        resolve(details)
                    } else {
                        reject(details)
                    }
                    worker.terminate()
                    workerTimeout && clearTimeout(workerTimeout)
                    break
            }
        })

        workerTimeout = setTimeout(() => {
            console.warn("Test terminated by timeout")
            worker.terminate()
        }, 3000)

        worker.postMessage({action: "runTest", value: {code, args, expectedResult}})
    })
}


export default GameEditor