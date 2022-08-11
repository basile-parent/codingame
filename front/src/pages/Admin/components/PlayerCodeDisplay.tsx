import {FC, useContext, useEffect, useState} from 'react'
import CodeFlask from "codeflask"
import styles from "./PlayerCodeDisplay.module.scss"
import editorStyles from "../../GameEditor/components/Editor.module.scss"
import "../../GameEditor/components/Editor.ide.scss"
import {AdminContext} from "../../../common/context/AdminContext";

let codeFlask: CodeFlask

type PlayerCodeDisplayProps = {}
const PlayerCodeDisplay: FC<PlayerCodeDisplayProps> = ({}: PlayerCodeDisplayProps) => {
    const { adminState: { selectedPlayerTopic }, dispatch } = useContext(AdminContext)
    const [ code, setCode ] = useState<string | null>(null)

    useEffect(() => {
        const id = "editor-ide"
        codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false,
            readonly: true,
        })
    }, [])

    useEffect(() => {
        const newCode = selectedPlayerTopic?.code
        codeFlask?.updateCode(newCode || "")
        setCode(newCode || selectedPlayerTopic ? "" : null)
    }, [ selectedPlayerTopic ])

    return (
        <article className={`${ styles.container } ${ code === null ? styles.hidden : "" }`}>
            <button className={styles.close} onClick={() => dispatch({ type: "setSelectedPlayerTopic", payload: null })} />
            <section className={editorStyles.editor}>
                <div id="editor-ide"/>
                <div className={editorStyles.editorCharCount}>{ code?.length || "-" }</div>
            </section>
        </article>
    )
}

export default PlayerCodeDisplay