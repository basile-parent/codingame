import {FC, useEffect, useMemo, useState} from 'react'
import {useSelector} from "react-redux"
import styles from "./Aftergame.module.scss"
import {TopicStatus} from "../../types/Game"
import Timer from "../../common/components/Timer"
import CodeDialog from "./CodeDialog"
import playerUtils from "../../utils/playerUtils"
import AfterGameLeaderboard from "./AfterGameLeaderboard"
import {RootState} from "../../common/store"
import TopicTimer from "../../common/components/TopicTimer";

type AfterGameProps = {}
const AfterGame: FC<AfterGameProps> = ({}: AfterGameProps) => {
    const game = useSelector((state: RootState) => state.game)
    const isFinished = useMemo(() => [ TopicStatus.FINISHED, TopicStatus.SCORE_CALCULATED ].includes(game!.topic!.status), [ game!.topic!.status ])

    const [ codeDialogContent, setCodeDialogContent ] = useState<string | null>(null)

    useEffect(() => {
        playerUtils.cleanSavedCode()
    }, [])

    return (
        <div className={styles.container}>
            {
                !isFinished &&
                <p className={styles.timer}>Temps restant: <TopicTimer /></p>
            }
            <h1>{isFinished ? "Manche terminée" : "Vous avez validé votre code"}</h1>
            <h2>Résultats de la manche</h2>
            <AfterGameLeaderboard setCodeDialogContent={setCodeDialogContent} />

            <CodeDialog code={codeDialogContent!}
                        open={!!codeDialogContent}
                        onClose={() => setCodeDialogContent(null)} />
        </div>
    )
}

export default AfterGame