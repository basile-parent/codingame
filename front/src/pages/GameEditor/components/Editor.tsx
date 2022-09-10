import {FC, useEffect, useMemo} from 'react'
import CodeFlask from "codeflask"
import {useSelector} from "react-redux"
import styles from "./Editor.module.scss"
import "./Editor.ide.scss"
import {DisplayMode} from "../../../types/DisplayMode"
import {GameMode} from "../../../types/Game"
import {RootState} from "../../../common/store"

type EditorProps = {
    code: string,
    updateCode: (code: string) => void
}
const Editor: FC<EditorProps> = ({ code, updateCode }) => {
    const game = useSelector((state: RootState) => state.game)
    const mode = useSelector((state: RootState) => state.mode)
    const isShortestTopic = useMemo(() => game!.topic!.gameMode === GameMode.SHORTEST, [ game!.topic! ])

    useEffect(() => {
        const id = "editor-ide"
        const codeFlask = new CodeFlask(`#${id}`, {
            language: 'js',
            lineNumbers: true,
            defaultTheme: false,
            readonly: mode === DisplayMode.ADMIN,
        })

        codeFlask.updateCode(code)
        codeFlask.onUpdate(updateCode)
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