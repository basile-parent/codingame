import {FC, useContext, useEffect, useMemo} from 'react'
import CodeFlask from "codeflask"
import styles from "./Editor.module.scss"
import "./Editor.ide.scss"
import {WSContext} from "../../../common/context/WSContext";
import {DisplayMode} from "../../../types/DisplayMode";
import {GameMode} from "../../../types/Game";

type EditorProps = {
    code: string,
    updateCode: (code: string) => void
}
const Editor: FC<EditorProps> = ({ code, updateCode }) => {
    const { wsState: { game, mode } } = useContext(WSContext)
    const isShortestTopic = useMemo(() => game!.topic!.gameMode === GameMode.SHORTEST, [ game!.topic! ])

    useEffect(() => {
        const id = "editor-ide"
        const codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false,
            readonly: mode === DisplayMode.ADMIN,
        });

        codeFlask.updateCode(code);
        codeFlask.onUpdate(updateCode);
    }, [])


    return (
        <section className={styles.editor}>
            <div id="editor-ide"/>
            {
                isShortestTopic &&
                <div className={styles.editorCharCount}>{ code.length }</div>
            }
        </section>
    )
}

export default Editor