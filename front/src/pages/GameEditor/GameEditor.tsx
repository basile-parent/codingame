import {FC, useCallback, useState} from 'react';
import {Editor, Header, OtherPlayers, OutputConsole, Topic, UnitTestsList, UnitTestsActions} from "./components";
import styles from "./GameEditor.module.scss"

type GameEditorProps = {}
const GameEditor: FC<GameEditorProps> = ({}: GameEditorProps) => {
    const [ code, setCode ] = useState(`const [ firstInput ] = inputArray
// Pour debugger, utiliser la fonction "debug". Exemple: debug(inputArray)
// Faire un "return" de la solution au problème

for (let i = 0; i < 5000; i++) {}
return "your solution"`)

    const executeTest = useCallback((args: any[], expectedResult: any) => runTest(code, args, expectedResult), [ code ])

    return (
        <article className={styles.gamePage}>
            <section className={styles.upperSection}>
                <Header/>

                <section className={styles.upperSectionContent}>
                    <Topic />
                    <Editor code={code} updateCode={setCode} />
                </section>

                <section className={styles.lowerSection}>
                    <section className={styles.lowerSectionContent}>

                        <section className={styles.output}>
                            <section className={styles.otherPlayers}>
                                <OtherPlayers />
                            </section>
                            <section className={styles.outputConsole}>
                                <OutputConsole />
                            </section>
                        </section>

                        <section className={styles.unitTests}>
                            <section className={styles.unitTestsList}>
                                <UnitTestsList onPlayTest={executeTest} />
                            </section>
                            <section className={ styles.unitTestsActions }>
                                <UnitTestsActions />
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </article>
    )
};

const runTest = (code: string, args: any[], expectedResult: any) => {
    const worker = new Worker(new URL('./lib/execute-tests.worker.js', import.meta.url), { type: 'module' })
    let workerTimeout: number | null = null

    worker.addEventListener('message', e => {
        switch (e.data.action) {
            case "debug":
                console.log(...e.data.value);
                break;
            case "notifyResult":
                console.log("notifyResult", e.data.value);
                worker.terminate()
                workerTimeout && clearTimeout(workerTimeout)
                break;
        }
    });

    workerTimeout = setTimeout(() => {
        console.log("terminate")
        worker.terminate()
    }, 1000)

    worker.postMessage({action: "runTest", value: {code, args, expectedResult}});
};


export default GameEditor;