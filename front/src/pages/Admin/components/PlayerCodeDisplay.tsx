import {FC, useContext, useEffect, useState} from 'react'
import CodeFlask from "codeflask"
import styles from "./PlayerCodeDisplay.module.scss"
import editorStyles from "../../GameEditor/components/Editor.module.scss"
import "../../GameEditor/components/Editor.ide.scss"
import {AdminContext} from "../../../common/context/AdminContext";
import {useSelector} from "react-redux";
import {RootState} from "../../../common/store";
import {GamePlayer, PlayerTopic} from "../../../types/Player";

let codeFlask: CodeFlask

type PlayerCodeDisplayProps = {}
const PlayerCodeDisplay: FC<PlayerCodeDisplayProps> = ({}: PlayerCodeDisplayProps) => {
    const { adminState: { selectedPlayerTopic }, dispatch } = useContext(AdminContext)
    const players = useSelector((state: RootState) => state.players)
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
        const selectedPlayer: GamePlayer | undefined = players.find(p => p.uuid === selectedPlayerTopic?.playerUuid)
        const storePlayerTopic = selectedPlayer?.topics?.find((t: PlayerTopic) => t.topicId === selectedPlayerTopic?.topicId)

        const newCode = storePlayerTopic?.tempCode || storePlayerTopic?.code
        codeFlask?.updateCode(newCode || "")
        setCode(newCode || storePlayerTopic ? "" : null)
    }, [ selectedPlayerTopic, players ])

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