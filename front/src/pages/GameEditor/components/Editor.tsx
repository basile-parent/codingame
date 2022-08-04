import {FC, useContext, useEffect} from 'react'
import CodeFlask from "codeflask"
import styles from "./Editor.module.scss"
import "./Editor.ide.scss"
import {WSContext} from "../../../common/context/WSContext";
import {DisplayMode} from "../../../types/DisplayMode";

type EditorProps = {
    code: string,
    updateCode: (code: string) => void
}
const Editor: FC<EditorProps> = ({ code, updateCode }) => {
    const { wsState } = useContext(WSContext)

    useEffect(() => {
        const id = "editor-ide"
        const codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false,
            readonly: wsState.mode === DisplayMode.ADMIN,
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