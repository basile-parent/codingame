import {FC} from 'react';
import {Header, Topic} from "./components";
import styles from "./GameEditor.module.scss"

type GameEditorProps = {}
const GameEditor: FC<GameEditorProps> = ({}: GameEditorProps) => {
    return (
        <article className={styles.gamePage}>
            <section className={styles.upperSection}>
                <Header/>

                <section className={styles.upperSectionContent}>
                    <Topic />
                    <div id="solution">AAA</div>
                </section>
            </section>
        </article>
    )
};

export default GameEditor;