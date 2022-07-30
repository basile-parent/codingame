import {FC, useEffect, useState} from 'react'
import CodeFlask from "codeflask"
import styles from "./Editor.module.scss"
import "./Editor.ide.scss"

type EditorProps = {
    code: string,
    updateCode: (code: string) => void
}
const Editor: FC<EditorProps> = ({ code, updateCode }) => {
    useEffect(() => {
        const id = "editor-ide"
        const codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false
        });

        codeFlask.updateCode(code);
        codeFlask.onUpdate(updateCode);
    }, [])


    return (
        <section className={styles.editor}>
            <div id="editor-ide"/>
            <div className={styles.editorCharCount}>{ code.length }</div>
        </section>
    )
}

export default Editor