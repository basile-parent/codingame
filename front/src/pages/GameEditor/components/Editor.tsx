import {FC} from 'react'
import styles from "./Editor.module.scss"

type EditorProps = {}
const Editor: FC<EditorProps> = ({}: EditorProps) => {
    return (
        <section className={styles.editor}>
            <div id="solution-ide"></div>
            <div className={styles.editorCharCount}>0</div>
        </section>
    )
}

export default Editor