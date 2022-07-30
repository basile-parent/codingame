import {FC, useEffect, useState} from 'react'
import CodeFlask from "codeflask"
import styles from "./Editor.module.scss"
import "./Editor.ide.scss"

type EditorProps = {}

const Editor: FC<EditorProps> = () => {
    const [ code, setCode ] = useState(`const [ firstInput ] = inputArray
// Pour debugger, utiliser la fonction "debug". Exemple: debug(inputArray)
// Faire un "return" de la solution au problème

for (let i = 0; i < 5000; i++) {}
return "your solution"`)

    useEffect(() => {
        const id = "editor-ide"
        const codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false
        });

        codeFlask.updateCode(code);
        codeFlask.onUpdate(setCode);
    }, [])


    return (
        <section className={styles.editor}>
            <div id="editor-ide"/>
            <div className={styles.editorCharCount}>0</div>
        </section>
    )
}

export default Editor