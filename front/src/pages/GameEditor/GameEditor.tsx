import {FC, useCallback, useContext, useState} from 'react';
import {Editor, Header, OtherPlayers, OutputConsole, Topic, UnitTestsActions, UnitTestsList} from "./components";
import styles from "./GameEditor.module.scss"
import {WSContext} from "../../common/context/WSContext";
import {DisplayMode} from "../../types/DisplayMode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import InstructionsModal from "./components/InstructionsModal";
import {UnitTestExecution, UnitTestExecutionStatus} from "../../types/Game";

const DEFAULT_CODE = `const [ firstInput ] = inputArray
// Pour debugger, utiliser la fonction "debug". Exemple: debug(inputArray)
// Faire un "return" de la solution au problème

for (let i = 0; i < 5000; i++) {}
return "your solution"`

type GameEditorProps = {}
const GameEditor: FC<GameEditorProps> = ({}: GameEditorProps) => {
    const {wsState: {game, mode}, dispatch} = useContext(WSContext)
    const [code, setCode] = useState<string>(game!.topic!.defaultCode || DEFAULT_CODE)
    const [dialogOpen, setDialogOpen] = useState<boolean>(true)

    const [unitTests, setUnitTests] = useState<UnitTestExecution[]>(game!.topic!.tests.map((test, index) => ({
        ...test,
        id: index,
        status: UnitTestExecutionStatus.WAIT
    })))
    const [selectedUnitTest, setSelectedUnitTest] = useState<UnitTestExecution | null>(null)

    const onCodeChange = useCallback((newCode: string) => {
        setSelectedUnitTest(null)
        setUnitTests(unitTests => unitTests.map(unitTest => ({
            ...unitTest,
            status: UnitTestExecutionStatus.WAIT,
            consoleOutput: undefined
        })))
        setCode(newCode)
    }, [])
    const executeTest = useCallback((testExecution: UnitTestExecution) => {
        setSelectedUnitTest(testExecution)
        return runTest(code, testExecution.inputs, testExecution.output)
            .then((details: string) => {
                return {
                    ...testExecution,
                    status: UnitTestExecutionStatus.SUCCESS,
                    consoleOutput: details
                } as UnitTestExecution
            })
            .catch(details => {
                return {
                    ...testExecution,
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

    const executeAllTest = useCallback(() => {
        // Execute sequentially until an error occurred
        unitTests.reduce(
            (p, test) =>
                p.then(_ => executeTest(test)),
            Promise.resolve()
        )
    }, [ unitTests ])

    const commitCode = useCallback(() => {
        dispatch({ type: "commitCode", payload: code})
    }, [ code ])

    return (
        <>
            <InstructionsModal open={dialogOpen} onClose={() => setDialogOpen(false)}/>
            <article className={styles.gamePage + " page"}>
                <section className={styles.upperSection}>
                    <Header/>

                    <section className={styles.upperSectionContent}>
                        <Topic/>
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
};

const runTest = (code: string, args: any[], expectedResult: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./lib/execute-tests.worker.js', import.meta.url))
        let workerTimeout: number | null = null

        worker.addEventListener('error', e => {
            reject(e.message)
            worker.terminate()
            workerTimeout && clearTimeout(workerTimeout)
        })
        worker.addEventListener('message', e => {
            switch (e.data.action) {
                // case "debug":
                //     console.log(...e.data.value);
                //     break;
                case "notifyResult":
                    const {isSuccess, details} = e.data.value
                    if (isSuccess) {
                        resolve(details)
                    } else {
                        reject(details)
                    }
                    worker.terminate()
                    workerTimeout && clearTimeout(workerTimeout)
                    break;
            }
        });

        workerTimeout = setTimeout(() => {
            console.warn("Test terminated by timeout")
            worker.terminate()
        }, 3000)

        worker.postMessage({action: "runTest", value: {code, args, expectedResult}})
    })
};


export default GameEditor;